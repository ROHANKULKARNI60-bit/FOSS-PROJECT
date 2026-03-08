import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3306;

const server = http.createServer((req, res) => {

  // HOME
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Home Page</h1>');
  }

  // LOGIN
  else if (req.url === '/login' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'college-portal-2.html');
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
  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log('Server running on http://localhost:3306');
});