type AquariumData = {
    status: string;
    temp: string;
    ph: string;
    length: string;
    timestamp: string;
  };
  
  // Connect to WebSocket Server
  const socket = new WebSocket('ws://localhost:8080');
  
  // Handle WebSocket Connection
  socket.addEventListener('open', () => {
    console.log('Connected to WebSocket Server');
  });
  
  // Listen for Messages
  socket.addEventListener('message', (event) => {
    const data: AquariumData = JSON.parse(event.data);
    console.log('Message from server:', data);
  
    // Update frontend with received data
    updateAquariumStatus(data.status);
    updateAdditionalInfo(data.temp, data.ph, data.length, data.timestamp);
  });
  
  // Update Water Status
  function updateAquariumStatus(status: string): void {
    const statusDot = document.getElementById('status-dot') as HTMLDivElement;
    const statusText = document.getElementById('status-text') as HTMLSpanElement;
  
    if (status === 'CRITIQUE') {
      statusDot.style.backgroundColor = 'red';
      statusText.textContent = 'Water is deadly';
    } if (status === 'ATTENTION') {
      statusDot.style.backgroundColor = 'orange';
      statusText.textContent = 'Water is moderate';
    } else {
        statusDot.style.backgroundColor = 'green';
        statusText.textContent = 'Water is safe';
      }
  }
  
  // Update Additional Info
  function updateAdditionalInfo(temp: string, ph: string, length: string, timestamp: string): void {
    (document.getElementById('temp-value') as HTMLSpanElement).textContent = `${temp}°C`;
    (document.getElementById('ph-value') as HTMLSpanElement).textContent = ph;
    (document.getElementById('length-value') as HTMLSpanElement).textContent = `${length}cm`;
    (document.getElementById('timestamp-value') as HTMLSpanElement).textContent = timestamp;
  }
  