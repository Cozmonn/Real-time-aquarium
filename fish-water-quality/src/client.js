// Connect to WebSocket Server
var socket = new WebSocket('ws://localhost:8080');
// Handle WebSocket Connection
socket.addEventListener('open', function () {
    console.log('Connected to WebSocket Server');
});
// Listen for Messages
socket.addEventListener('message', function (event) {
    var data = JSON.parse(event.data);
    console.log('Message from server:', data);
    // Update frontend with received data
    updateAquariumStatus(data.status);
    updateAdditionalInfo(data.temp, data.ph, data.length, data.timestamp);
});
// Update Water Status
function updateAquariumStatus(status) {
    var statusDot = document.getElementById('status-dot');
    var statusText = document.getElementById('status-text');
    if (status === 'poisoned') {
        statusDot.style.backgroundColor = 'red';
        statusText.textContent = 'Water is deadly';
    }
    else {
        statusDot.style.backgroundColor = 'green';
        statusText.textContent = 'Water is safe';
    }
}
// Update Additional Info
function updateAdditionalInfo(temp, ph, length, timestamp) {
    document.getElementById('temp-value').textContent = "".concat(temp, "\u00B0C");
    document.getElementById('ph-value').textContent = ph;
    document.getElementById('length-value').textContent = "".concat(length, "cm");
    document.getElementById('timestamp-value').textContent = timestamp;
}
