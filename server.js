import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {

  // HOME
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Home Page</h1>');
  }

  // LOGIN
  else if (req.url === '/login' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'login.html');

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

  // REGISTER
  else if (req.url === '/register' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'register.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading register page');
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

  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }

});

server.listen(3306, () => {
  console.log('Server running on http://localhost:3306');
});