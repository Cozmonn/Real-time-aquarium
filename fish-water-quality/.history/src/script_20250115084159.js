// Select the tank and status indicator
const tank = document.getElementById("tank");
const statusIndicator = document.getElementById("status-indicator");

// Fish array for animation
const fishIcons = ["🐟 🐠 🐡", "🐡", "🐠", "🐟", "🐟 🐠 🦑 🐙"];
const fishes = [];

// Initialize aquarium with 10 fishes
function initializeTank() {
  for (let i = 0; i < 10; i++) {
    const fish = document.createElement("div");
    fish.classList.add("fish");
    fish.style.left = `${Math.random() * 100}%`;
    fish.style.top = `${Math.random() * 100}%`;
    fish.style.fontSize = `${Math.random() * 20 + 20}px`;
    fish.textContent = fishIcons[Math.floor(Math.random() * fishIcons.length)];
    tank.appendChild(fish);
    fishes.push(fish);
    animateFish(fish);
  }
}

// Animate fish movement
function animateFish(fish) {
  const moveFish = () => {
    fish.style.left = `${Math.random() * 100}%`;
    fish.style.top = `${Math.random() * 100}%`;
    fish.style.transform = `scaleX(${Math.random() > 0.5 ? -1 : 1})`; // Flip fish
    setTimeout(moveFish, Math.random() * 3000 + 2000); // Random delay between moves
  };
  moveFish();
}

// Simulate "clean" and "suck" status
function simulateStatus() {
  setInterval(() => {
    const status = Math.random() > 0.5 ? "clean" : "suck";
    updateTankStatus(status);
  }, 5000); // Change status every 5 seconds
}

// Update aquarium based on status
function updateTankStatus(status) {
  statusIndicator.textContent = `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`;
  if (status === "suck") {
    fishes.forEach((fish) => fish.classList.add("dead")); // Mark fish as dead
  } else {
    fishes.forEach((fish) => fish.classList.remove("dead")); // Restore fish
  }
}

// Initialize the aquarium
initializeTank();
simulateStatus();
