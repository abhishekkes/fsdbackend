const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log("hello world")
    res.write("Hello World")
    res.end('Hello World from Node.js Server!');
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
