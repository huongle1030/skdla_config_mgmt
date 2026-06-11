// Runs on Vercel at build time. Generates config.local.js from environment
// variables so the Supabase URL/key are never committed to GitHub.
// Locally you keep your own config.local.js (git-ignored); this only runs on Vercel.
const fs = require('fs');
const url    = process.env.SB_URL    || '';
const key    = process.env.SB_KEY    || '';
const bucket = process.env.SB_BUCKET || 'config-docs';
const out = `// AUTO-GENERATED at build time from Vercel env vars. Do not edit.
window._SB_URL = ${JSON.stringify(url)};
window._SB_KEY = ${JSON.stringify(key)};
window._SB_BUCKET = ${JSON.stringify(bucket)};
`;
fs.writeFileSync('config.local.js', out);
console.log('Generated config.local.js — ' + (url && key ? 'configured OK' : 'WARNING: SB_URL/SB_KEY env vars missing'));
