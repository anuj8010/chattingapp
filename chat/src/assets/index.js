// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('New client connected');

  // When a message is received from a client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all other connected clients
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // When a client disconnects
  socket.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
