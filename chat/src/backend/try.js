import { WebSocketServer } from "ws";
  
  // WebSocket setup
  const wss = new WebSocketServer({ port:8081});
  
  wss.on('connection', (ws) => {
    console.log('New client connected');
  
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.on('close', () => {
      console.log('Client has disconnected');
    });
  
  });
  
  console.log(`WebSocket server is running on ws://localhost:8081`);
  