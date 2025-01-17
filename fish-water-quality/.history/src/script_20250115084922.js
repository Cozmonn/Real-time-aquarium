// Select the tank and status indicator
const tank = document.getElementById("tank");
const statusIndicator = document.getElementById("status-indicator");

// Fish array for animation
const fishIcons = ["🐟 ","🐠", "🐡", "🐡", "🐠", "🐟", "🐟"," 🐠 ","🦑 ","🐙"];
const fishes = [];
// Initialize aquarium with 10 fishes
function initializeTank() {
    for (let i = 0; i < 30; i++) {
      const fish = document.createElement("div");
      fish.classList.add("fish");
      fish.style.left = `${Math.random() * 100}%`;
      fish.style.top = `${Math.random() * 100}%`;
      fish.style.fontSize = `${Math.random() * 20 + 20}px`;
      fish.textContent = fishIcons[Math.floor(Math.random() * fishIcons.length)];
      tank.appendChild(fish);
      fishes.push(fish);
      moveFishSmoothly(fish);
    }
  }
  
  // Smoothly move fish
  function moveFishSmoothly(fish) {
    const moveFish = () => {
      const newX = Math.random() * 100; // Random X position
      const newY = Math.random() * 100; // Random Y position
      const direction = Math.random() > 0.5 ? 1 : -1; // Random flip direction
  
      // Apply the movement and direction
      fish.style.transform = `translate(${newX}vw, ${newY}vh) scaleX(${direction})`;
  
      setTimeout(moveFish, Math.random() * 4000 + 2000); // Random delay for next move
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
  function updateTankStatuas(status) {
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