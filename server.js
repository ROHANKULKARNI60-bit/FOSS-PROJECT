
import http from 'http';

const PORT = process.env.PORT || 5000;

const requestHandler = (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end(`Hello from server on port ${PORT}!\n`);
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

export default server;

