(function () {
    const fishes = ["🐟", "🐠", "🐡", "🐡", "🐠", "🐟", "🐟", "🐠", "🦑", "🐙"];
    const tank = document.getElementById("tank");
    const overlay = document.getElementById("overlay");
    const statusDot = document.getElementById("status-dot");
    const statusText = document.getElementById("status-text");
    const timeouts = [];
    let WINDOW_MIN;
    const MIN_THRESHOLD = 650;
  
    window.onload = () => {
      initializeTank();
      simulateStatus();
    };
  
    window.addEventListener("resize", () => {
      initializeTank();
    });
  
    /* Initialize tank */
    function initializeTank() {
      WINDOW_MIN = Math.min(tank.clientHeight, tank.clientWidth);
      generateFishTank();
    }
  
    /* Generate Fish Tank */
    function generateFishTank() {
      clearTimeouts();
      const numFish = 60; // Number of fishes
      for (let i = 0; i < numFish; i++) {
        const fish = document.createElement("div");
        fish.classList.add("fish");
        fish.style.left = `${Math.random() * 100}%`;
        fish.style.top = `${Math.random() * 100}%`;
        fish.style.fontSize = `${Math.random() * 20 + 20}px`;
        fish.textContent = fishes[Math.floor(Math.random() * fishes.length)];
        tank.appendChild(fish);
        moveFishSmoothly(fish);
      }
    }
  
    /* Smoothly Move Fish */
    function moveFishSmoothly(fish) {
      const moveFish = () => {
        const newX = Math.random() * 100;
        const newY = Math.random() * 100;
        const direction = Math.random() > 0.5 ? 1 : -1;
  
        fish.style.transition = "transform 5s ease-in-out";
        fish.style.transform = `translate(${newX}vw, ${newY}vh) scaleX(${direction})`;
  
        setTimeout(moveFish, Math.random() * 4000 + 2000); // Random delay for next move
      };
      moveFish();
    }
  
    /* Simulate Clean and Poisoned Status */
    function simulateStatus() {
      setInterval(() => {
        const status = Math.random() > 0.5 ? "clean" : "poisoned";
        updateAquariumStatus(status);
      }, 5000); // Change status every 5 seconds
    }
  
    /* Update Aquarium Status */
    function updateAquariumStatus(status) {
      if (status === "poisoned") {
        overlay.style.opacity = 1; // Show dirty water overlay
        statusDot.style.backgroundColor = "red"; // Change dot to red
        statusText.textContent = "Water is deadly";
      } else {
        overlay.style.opacity = 0; // Hide dirty water overlay
        statusDot.style.backgroundColor = "green"; // Change dot to green
        statusText.textContent = "Water is safe";
      }
    }
  
    /* Clear Timeouts */
    function clearTimeouts() {
      for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      timeouts.length = 0;
    }
  })();
  