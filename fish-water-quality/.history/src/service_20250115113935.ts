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
  
    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Connected to WebSocket Server' }));
  
    // Broadcast random data every 5 seconds
    const interval = setInterval(() => {
      // Randomly select a status
      const statuses = ['BON', 'ATTENTION', 'CRITIQUE'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
  
      // Prepare data object
      const data: AquariumData = {
        status: status, // Assign the randomly selected status
        temp: (20 + Math.random() * 10).toFixed(1), // Random temp between 20-30°C
        ph: (6 + Math.random() * 2).toFixed(1), // Random pH between 6.0-8.0
        length: (50 + Math.random() * 150).toFixed(1), // Random length between 50-200cm
        timestamp: new Date().toLocaleTimeString(), // Current timestamp
      };
  
      // Send data to the client
      ws.send(JSON.stringify(data));
    }, 5000);
  
    // Handle client disconnection
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval); // Clear interval on disconnect
    });
  });
  
