# Enterprise Legal OS - Local Static Web Server with Ollama Local AI Proxy
$port = 8080
$ollamaPort = 11434
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Impacteers DMS local server running on http://127.0.0.1:$port/ (Ollama Proxy on /api/ollama) ..."
} catch {
    Write-Host "Port $port occupied or error: $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".mjs"  = "text/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$baseDir = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Add Global CORS Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

        # Handle CORS Preflight
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.LocalPath.TrimStart('/')

        # 1. Ollama AI Proxy Routing (/api/ollama/* -> http://127.0.0.1:11434/api/*)
        if ($urlPath.StartsWith("api/ollama")) {
            $ollamaSubPath = $urlPath.Substring("api/ollama".Length)
            if (-not $ollamaSubPath.StartsWith("/")) { $ollamaSubPath = "/" + $ollamaSubPath }
            $targetOllamaUrl = "http://127.0.0.1:$ollamaPort/api$ollamaSubPath"

            try {
                $proxyReq = [System.Net.HttpWebRequest]::Create($targetOllamaUrl)
                $proxyReq.Method = $request.HttpMethod
                $proxyReq.ContentType = if ($request.ContentType) { $request.ContentType } else { "application/json" }
                $proxyReq.Timeout = 120000

                if ($request.HttpMethod -eq "POST" -or $request.HttpMethod -eq "PUT") {
                    $reqStream = $request.InputStream
                    $proxyReqStream = $proxyReq.GetRequestStream()
                    $reqStream.CopyTo($proxyReqStream)
                    $proxyReqStream.Close()
                }

                $proxyRes = $proxyReq.GetResponse()
                $response.StatusCode = [int]$proxyRes.StatusCode
                $response.ContentType = $proxyRes.ContentType

                $resStream = $proxyRes.GetResponseStream()
                $resStream.CopyTo($response.OutputStream)
                $proxyRes.Close()
            } catch [System.Net.WebException] {
                $webEx = $_.Exception
                if ($webEx.Response) {
                    $errRes = [System.Net.HttpWebResponse]$webEx.Response
                    $response.StatusCode = [int]$errRes.StatusCode
                    $response.ContentType = "application/json; charset=utf-8"
                    $errStream = $errRes.GetResponseStream()
                    $errStream.CopyTo($response.OutputStream)
                } else {
                    $response.StatusCode = 503
                    $response.ContentType = "application/json; charset=utf-8"
                    $errJson = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Ollama is not running. Start Ollama with `ollama run llama3.2` or launch the desktop app.","connected":false}')
                    $response.OutputStream.Write($errJson, 0, $errJson.Length)
                }
            } catch {
                $response.StatusCode = 500
                $response.ContentType = "application/json; charset=utf-8"
                $errJson = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Internal proxy error","connected":false}')
                $response.OutputStream.Write($errJson, 0, $errJson.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        # 2. Static File Serving
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $baseDir $urlPath
        $filePath = [System.IO.Path]::GetFullPath($filePath)

        if ($filePath.StartsWith($baseDir) -and (Test-Path $filePath -PathType Leaf)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $contentType

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("File Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # Catch connection aborts
    }
}
