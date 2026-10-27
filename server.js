import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback for all sub-routes (/r/:slug, /prompts, /apps, /admin, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Techy Sumit production server running on port ${PORT}`);
});
