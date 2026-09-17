import fs from 'fs';
import path from 'path';

console.log('🚀 Running Netlify build process for Impacteers Legal DMS...');

// If environment variables are available (e.g. from Netlify UI), create runtime config
const runtimeConfig = {
  gemini_api_key: process.env.gemini_api_key || process.env.GEMINI_API_KEY || ''
};

try {
  fs.writeFileSync('env-config.json', JSON.stringify(runtimeConfig, null, 2));
  console.log('✅ Runtime configuration generated successfully.');
} catch (err) {
  console.warn('⚠️ Could not generate runtime config, continuing build:', err.message);
}

console.log('✨ Build completed successfully! Ready for Netlify deployment.');
