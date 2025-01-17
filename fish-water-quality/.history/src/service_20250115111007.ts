import WebSocket, { WebSocketServer } from 'ws';

type AquariumData = {
  status: string;
  temp: string;
  ph: string;
  length: string;
  timestamp: string;
};

// Create WebSocket Server
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  // Send a message to the client
  ws.send(JSON.stringify({ message: 'Connected to WebSocket Server' }));

  // Broadcast random data every 5 seconds
  const interval = setInterval(() => {
    const data: AquariumData = {
      status: Math.random() > 0.5 ? 'clean' : 'poisoned',
      temp: (20 + Math.random() * 10).toFixed(1), // Random temp between 20-30°C
      ph: (6 + Math.random() * 2).toFixed(1), // Random pH between 6.0-8.0
      length: (50 + Math.random() * 150).toFixed(1), // Random length between 50-200cm
      timestamp: new Date().toLocaleTimeString(),
    };
    ws.send(JSON.stringify(data));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval); // Clear interval on disconnect
  });
});
