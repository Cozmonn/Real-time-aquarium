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
  
      let minInterval = myoptions.SwimSpeed === "Slow" ? 8000 : myoptions.SwimSpeed === "Moderate" ? 5000 : 3000;
      let maxInterval = myoptions.SwimSpeed === "Slow" ? 15000 : myoptions.SwimSpeed === "Moderate" ? 10000 : 6000;
  
      let nextCall = getRandomInt(minInterval, maxInterval);
      moveSchool(school, nextCall);
  
      timeout = setTimeout(() => loop(school), nextCall);
      school.setAttribute("data-timeout", timeout);
      timeouts.push(timeout);
    }
  
    /* Move School Smoothly */
    function moveSchool(school, nextCall) {
      let currentX = parseFloat(school.getAttribute("data-x")) || 0;
      let currentY = parseFloat(school.getAttribute("data-y")) || 0;
  
      let newX = getRandomFloat(-tank.clientWidth / 2, tank.clientWidth / 2);
      let newY = getRandomFloat(-tank.clientHeight / 2, tank.clientHeight / 2);
  
      const isRight = newX > currentX;
      const easing = "ease-in-out";
  
      school.style.transition = `transform ${nextCall / 1000}s ${easing}`;
      school.style.transform = `translate(${newX}px, ${newY}px)`;
      school.setAttribute("data-x", newX);
      school.setAttribute("data-y", newY);
  
      let maxTranslationDistance = WINDOW_MIN < MIN_THRESHOLD ? 50 : 100;
      [...school.querySelectorAll(".fish")].forEach((fish) => {
        let translateX = getRandomFloat(-maxTranslationDistance, maxTranslationDistance);
        let translateY = getRandomFloat(-maxTranslationDistance, maxTranslationDistance);
  
        fish.style.transition = `transform ${nextCall / 2000}s ${easing}`;
        fish.style.transform = `translate(${translateX}px, ${translateY}px) scaleX(${isRight ? -1 : 1})`;
      });
    }
  
    /* Generate Fish */
    function generateFish(pos, hueShift, size, icon) {
      let htm = `<div class="direction">${icon}</div>`;
      let f = document.createElement("div");
      f.setAttribute("class", "fish");
      f.style.filter = `hue-rotate(${hueShift}deg)`;
      f.style.left = `${pos[0]}%`;
      f.style.top = `${pos[1]}%`;
      f.style.fontSize = `${size}px`;
      f.innerHTML = htm;
      return f;
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
    /* Update Aquarium Status */
    function updateAquariumStatus(status) {
        if (status === "poisoned") {
        overlay.style.opacity = 1; // Show dirty water overlay
        statusDot.style.backgroundColor = "red"; // Update dot to red
        statusDot.style.animation = "blink-deadly 1s infinite"; // Change to deadly blinking animation
        statusText.textContent = "Water is deadly"; // Update text
        } else {
        overlay.style.opacity = 0; // Hide dirty water overlay
        statusDot.style.backgroundColor = "green"; // Update dot to green
        statusDot.style.animation = "blink-safe 1.5s infinite"; // Change to safe blinking animation
        statusText.textContent = "Water is safe"; // Update text
        }
    }
  
    function generateControls() {
      myoptions = new (function Options() {
        this.NumFishGroups = 60;
        this.SingleFishOnly = false;
        this.MaxPerSchool = 6;
        this.ColorChanging = false;
        this.PercentSchools = 25;
        this.SwimSpeed = "Moderate";
        this.FishSpecies = "🐟 🐠 🐡 🦑 🐙";
      })();
    }
  })();
  