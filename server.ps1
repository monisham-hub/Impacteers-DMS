# Impacteers DMS - Enterprise In-House Legal & Document Management System Web Server
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Impacteers DMS web server running on http://127.0.0.1:$port/ ..."
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
    ".pdf"  = "application/pdf"
    ".docx" = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ".txt"  = "text/plain; charset=utf-8"
    ".env"  = "text/plain; charset=utf-8"
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
        
        # Prevent Browser Caching
        $response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")

        # Handle CORS Preflight
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $urlPath = $request.Url.LocalPath.TrimStart('/')

        # Static File Serving
        if ([string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $baseDir $urlPath
        $filePath = [System.IO.Path]::GetFullPath($filePath)

        # Security check: ensure path is within base directory
        if (-not $filePath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $response.OutputStream.Close()
            continue
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $response.ContentType = $contentType
            $response.StatusCode = 200

            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $fileBytes.Length
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            # Fallback to index.html for SPA routing if needed
            $indexPath = Join-Path $baseDir "index.html"
            if (Test-Path $indexPath -PathType Leaf) {
                $response.ContentType = "text/html; charset=utf-8"
                $response.StatusCode = 200
                $fileBytes = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentLength64 = $fileBytes.Length
                $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
            } else {
                $response.StatusCode = 404
            }
        }
        $response.OutputStream.Close()
    } catch {
        # Continue listening
    }
}
