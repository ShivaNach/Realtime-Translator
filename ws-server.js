import { WebSocketServer } from 'ws';


const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');


const clients = new Set();

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    // Broadcast to all other clients
    for (const client of clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(message.toString());
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});
