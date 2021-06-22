import { connectAndListenSocket } from './socket/socket';

const server = require('http').createServer();

connectAndListenSocket(server);

server.listen(3000, () => console.log('Listening on port 3000'));
