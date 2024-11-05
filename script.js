document.addEventListener("DOMContentLoaded", () => {
    const obstacle = document.querySelector("#obstacle");
    const movable = document.querySelector("#movable");
    const step = 10; // The amount of pixels the element moves with each arrow key press
  
    // Function to check for collision occur with obstacle
    function isColliding() {
      const movableBounds = movable.getBoundingClientRect();
      const obstacleBounds = obstacle.getBoundingClientRect();
  
      return (
        movableBounds.top < obstacleBounds.bottom &&
        movableBounds.bottom > obstacleBounds.top &&
        movableBounds.left < obstacleBounds.right &&
        movableBounds.right > obstacleBounds.left
      );
    }
  
    // Function to check if element is within screen boundary
    function withinScreenBounds(newLeft, newTop) {
    const movableWidth = movable.offsetWidth;
    const movableHeight = movable.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return (
      newLeft >= 0 &&
      newTop >= 0 &&
      newLeft + movableWidth <= viewportWidth &&
      newTop + movableHeight <= viewportHeight
    );
  }

    // `onclick` event to place the movable element at the click location
    document.addEventListener("click", (e) => {
    const newLeft = e.x - movable.offsetWidth / 2;
    const newTop = e.y - movable.offsetHeight / 2;

    // Place only if within screen bounds
      if (withinScreenBounds(newLeft, newTop)) {
      movable.style.left = `${newLeft}px`;
      movable.style.top = `${newTop}px`;
      }
  
      // Check for collision after placing
      if (isColliding()) {
        movable.classList.add("touch");
        movable.style.backgroundColor = "blue";
        console.log("Collision detected!");
      } else {
        movable.classList.remove("touch");
        movable.style.backgroundColor = ""; // Reset color if not colliding
      }
    });
  
    // `onkeydown` event to move the element with arrow keys
    window.addEventListener("keydown", (e) => {
      let left = parseInt(movable.style.left || 0);
      let top = parseInt(movable.style.top || 0);
      let newLeft = left;
      let newTop = top;
  
      switch (e.key) {
        case "ArrowUp":
            newTop -= step;
          break;
        case "ArrowDown":
            newTop += step;
          break;
        case "ArrowLeft":
            newLeft -= step;
          break;
        case "ArrowRight":
            newLeft += step;
          break;
      }  
     
      // Check if new position is within screen bounds
      if (withinScreenBounds(newLeft, newTop)) {  
      movable.style.left = `${newLeft}px`;
      movable.style.top = `${newTop}px`;
  
      // Check for collision after movement
      if (isColliding()) {
        // If colliding, revert to the previous position
      movable.style.left = `${left}px`;
      movable.style.top = `${top}px`;
      movable.classList.add("touch");
      movable.style.backgroundColor = "blue"; // Change color on collision
      console.log("Collision detected, movement stopped!");
      } else {
      movable.classList.remove("touch");
      movable.style.backgroundColor = ""; // Reset color if not colliding
      }
    
      }
    
    
    });
  
  });
  



