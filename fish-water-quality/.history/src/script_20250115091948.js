(function () {
    var myoptions, gui;
    const fishes = ["🐟", "🐠", "🐡", "🐡", "🐠", "🐟", "🐟", "🐠", "🦑", "🐙"];
    const tank = document.getElementById("tank");
    const overlay = document.getElementById("overlay");
    const statusDot = document.getElementById("status-dot");
    const statusText = document.getElementById("status-text");
    var WINDOW_MIN;
    const MIN_THRESHOLD = 650;
    var timeouts = [];
  
    window.onload = () => {
      generateControls();
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
      if (WINDOW_MIN <= MIN_THRESHOLD) {
        gui.close();
      } else {
        gui.close();
      }
    }
  
    /* Generate Fish Tank */
    function generateFishTank() {
      clearTimeouts();
      tank.innerHTML = ""; // Clear previous fish
      tank.appendChild(overlay); // Add overlay back
      tank.appendChild(document.getElementById("status-box")); // Add status box back
      for (let i = 0; i < myoptions.NumFishGroups; i++) {
        let species = pick(myoptions.FishSpecies.split(" "));
        let numFish = 1;
        if (!myoptions.SingleFishOnly && Math.random() * 100 > 100 - myoptions.PercentSchools) {
          numFish = getRandomInt(1, myoptions.MaxPerSchool);
        }
        let hueShift = myoptions.ColorChanging ? getRandomInt(0, 360) : 0;
  
        let school = generateSchool(numFish, species, hueShift);
        tank.appendChild(school);
        loop(school);
      }
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
        statusDot.style.backgroundColor = "red"; // Update dot to red
        statusText.textContent = "Water is deadly"; // Update text
      } else {
        overlay.style.opacity = 0; // Hide dirty water overlay
        statusDot.style.backgroundColor = "green"; // Update dot to green
        statusText.textContent = "Water is safe"; // Update text
      }
    }
  
    /* Generate Fish School */
    function generateSchool(numFish, species, hueShift) {
      let root = document.createElement("div");
      root.setAttribute("class", "school");
      root.style.width = `${getRandomFloat(100, 1000)}px`;
      root.style.height = `${getRandomFloat(100, 700)}px`;
      root.style.left = `${getRandomFloat(0, 100)}%`;
      root.style.top = `${getRandomFloat(0, 100)}%`;
  
      let maxFishSize = WINDOW_MIN < MIN_THRESHOLD ? 50 : 80;
      let minFishSize = WINDOW_MIN < MIN_THRESHOLD ? 5 : 10;
      let staticSize = getRandomInt(minFishSize, maxFishSize / 2);
      let allSameSize = numFish > 1 && Math.random() > 0.7;
  
      for (let i = 0; i < numFish; i++) {
        let fishPos = [getRandomFloat(0, 100), getRandomFloat(0, 100)];
        let size = allSameSize ? staticSize : getRandomInt(minFishSize, maxFishSize);
        let fish = generateFish(fishPos, hueShift, size, species);
        root.appendChild(fish);
      }
      return root;
    }
  
    /* Helpers */
    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function getRandomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function clearTimeouts() {
      for (var i = 0; i < timeouts.length; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }
  
    function generateControls() {
      myoptions = new (function Options() {
        this.NumFishGroups = 60;
        this.SingleFishOnly = false;
        this.MaxPerSchool = 6;
        this.ColorChanging = true;
        this.PercentSchools = 25;
        this.SwimSpeed = "Moderate";
        this.FishSpecies = "🐟 🐠 🐡 🦑 🐙";
      })();
    }
  })();
  