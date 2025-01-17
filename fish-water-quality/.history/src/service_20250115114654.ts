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
  
    // Send a welcome message
    ws.send(JSON.stringify({ message: 'Connected to WebSocket Server' }));
  
    const interval = setInterval(() => {
      // Generate random values for temperature and pH
      const temp = parseFloat((20 + Math.random() * 10).toFixed(1)); // Random temp between 20-30°C
      const ph = parseFloat((6 + Math.random() * 2).toFixed(1)); // Random pH between 6.0-8.0
  
      // Determine status based on temp and pH
      let status: string;
      if (ph >= 6.5 && ph <= 8.0 && temp >= 22 && temp <= 28) {
        status = 'BON'; // Good
      } else if (
        (ph >= 6.0 && ph < 6.5) || (ph > 8.0 && ph <= 8.5) ||
        (temp >= 20 && temp < 22) || (temp > 28 && temp <= 30)
      ) {
        status = 'ATTENTION'; // Warning
      } else {
        status = 'CRITIQUE'; // Critical
      }
  
      // Prepare data object
      const data: AquariumData = {
        status: status,
        temp: temp.toFixed(1),
        ph: ph.toFixed(1),
        length: (50 + Math.random() * 150).toFixed(1), // Random length
        timestamp: new Date().toLocaleTimeString(),
      };
  
      // Send data to the client
      ws.send(JSON.stringify(data));
    }, 5000);
  
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval); // Clear interval on disconnect
    });
  });
  