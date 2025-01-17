(function () {
    var myoptions, gui;
    const fishes = ["🐟", "🐠", "🐡", "🐡", "🐠", "🐟", "🐟", "🐠", "🦑", "🐙"];
    var tank = document.getElementById("tank");
    var overlay = document.getElementById("overlay");
    var statusDot = document.getElementById("status-dot");
    var statusText = document.getElementById("status-text");
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
      tank.innerHTML = "";
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
  
    /* Loop Function */
    function loop(school) {
      let timeout = school.getAttribute("data-timeout");
      clearTimeout(timeout);
  