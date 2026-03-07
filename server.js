import http from 'http';

const PORT = process.env.PORT || 3306;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');

  //ROUTING
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Home Page</h1>');
  }
  if (req.url === '/login') {
    res.sendFile(path.join(__dirname, 'login.html'));
  }
  if (req.url === '/register') {
    res.sendFile(path.join(__dirname, 'register.html'));
  }
  if (req.url === '/dashboard') {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});