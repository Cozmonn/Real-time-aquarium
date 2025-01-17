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
  
    var stat = data.status;
    // Update frontend with received data
    updateAquariumStatus(stat);
    updateAdditionalInfo(data.temp, data.ph, data.length, data.timestamp);
  });
  
  function updateAquariumStatus(status: string): void {
    console.log('Update function called with status:', status);
  
    const statusDot = document.getElementById('status-dot') as HTMLDivElement;
    const statusText = document.getElementById('status-text') as HTMLSpanElement;
  
    if (!statusDot || !statusText) {
      console.error('Could not find DOM elements: status-dot or status-text');
      return;
    }
  
    if (status === 'CRITIQUE') {
      console.log('Status is CRITIQUE');
      statusDot.style.backgroundColor = 'red';
      statusText.textContent = 'Water is deadly';
    } else if (status === 'ATTENTION') {
      console.log('Status is ATTENTION');
      statusDot.style.backgroundColor = 'orange';
      statusText.textContent = 'Water is moderate';
    } else {
      console.log('Status is BON');
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
  