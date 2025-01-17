function moveSchool(school, nextCall) {
    // Retrieve current position of the school
    let currentX = parseFloat(school.getAttribute("data-x")) || 0;
    let currentY = parseFloat(school.getAttribute("data-y")) || 0;

    // Calculate new random position
    let newX = getRandomFloat(-tank.clientWidth / 2, tank.clientWidth / 2);
    let newY = getRandomFloat(-tank.clientHeight / 2, tank.clientHeight / 2);

    const isRight = newX > currentX; // Determine direction
    const easing = "ease-in-out"; // Smooth animation easing

    // Apply transform for smooth movement
    school.style.transition = `transform ${nextCall / 1000}s ${easing}`;
    school.style.transform = `translate(${newX}px, ${newY}px)`;
    school.setAttribute("data-x", newX);
    school.setAttribute("data-y", newY);

    // Move individual fish within the school for natural effect
    let maxTranslationDistance = WINDOW_MIN < MIN_THRESHOLD ? 50 : 100;
    [...school.querySelectorAll(".fish")].forEach(fish => {
        let translateX = getRandomFloat(-maxTranslationDistance, maxTranslationDistance);
        let translateY = getRandomFloat(-maxTranslationDistance, maxTranslationDistance);

        // Update fish's direction and position
        fish.style.transition = `transform ${nextCall / 2000}s ${easing}`;
        fish.style.transform = `translate(${translateX}px, ${translateY}px) scaleX(${isRight ? -1 : 1})`;
    });
}

function loop(school) {
    // Set random intervals for smooth looping
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
