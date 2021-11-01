const http = require('http'); //it is similar to import in angular
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
