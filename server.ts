import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DIST_DIR = path.join(import.meta.dirname, 'dist');

// Serve static assets from dist
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// Fallback to index.html for SPA client-side routing
app.get('*', (req: Request, res: Response) => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Building application, please refresh in a moment...');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Application running on http://0.0.0.0:${PORT}`);
});
