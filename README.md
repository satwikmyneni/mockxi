# MockXI — IPL Mock Auction

## Deploy to Netlify via GitHub

1. Push this repo to GitHub
2. Go to app.netlify.com → "Add new site" → "Import from Git"
3. Select your repo
4. Build settings: leave blank (no build command needed)
5. Click Deploy

## Project structure
```
mockxi/
├── index.html              ← Main app
├── netlify.toml            ← Netlify config
├── _headers                ← Security headers
└── netlify/
    └── functions/
        └── ai-proxy.js     ← Serverless proxy for AI
```
