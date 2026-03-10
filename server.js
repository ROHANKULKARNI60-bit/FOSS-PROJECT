import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8000;

//file finding
function findFile(dir, filename) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const found = findFile(fullPath, filename); // recurse into subfolders
      if (found) return found;
    } else if (file === filename) {
      return fullPath;
    }
  }
  return null;
}
const server = http.createServer((req, res) => {

  // HOME
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Home Page</h1>');
  }

  // LOGIN
  else if (req.url === '/login' && req.method === 'GET') {
    const filePath = findFile(path.join(__dirname, 'login'), 'login.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading login page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }


  // DASHBOARD
  else if (req.url === '/dashboard' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'dashboard.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading dashboard page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  //Profile
    else if (req.url === '/profile' && req.method === 'GET') { 
    const filePath = path.join(__dirname, 'profile-2.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading profile page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
  });
}

  // Settings
  else if (req.url === '/settings' && req.method === 'GET') { 
    const filePath = path.join(__dirname, 'settings-2.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading settings page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
  });
}

  else if (req.method === 'GET' && (req.url.endsWith('.css') || req.url.endsWith('.js'))) {
  const filename = path.basename(req.url);
  const filePath = findFile(__dirname, filename);  // ← searches entire project

  if (!filePath) {
    res.writeHead(404);
    return res.end(`${filename} not found`);
  }

  const ext = path.extname(filename);
  const contentTypes = {
    '.css': 'text/css',
    '.js': 'application/javascript',
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(data);
    }
  });
}
  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log('Server running on http://localhost:3306');
});