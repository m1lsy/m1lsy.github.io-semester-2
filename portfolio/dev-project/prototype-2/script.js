document.addEventListener('DOMContentLoaded', function() {
    // Access the canvas and its context
    var canvas = document.getElementById('pmCanvas');
    var ctx = canvas.getContext('2d');
  
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
  
    // Create Image objects for blue square and red circle
    var img1 = new Image();  // Blue Square
    var img2 = new Image();  // Red Circle
  
    // Set the source of the images
    img2.src = '../img-nasmak/plusa-open.png';  // Mouth open Eyes open image
    img1.src = '../img-nasmak/plusa-closed.png'; // Mouth closed Eyes open image
  
    // Handle image loading errors
    img1.onerror = function() {
        console.error('Error loading img1 (blue square)');
    };
    img2.onerror = function() {
        console.error('Error loading img2 (red circle)');
    };
  
    // Image dimensions (modify these based on the image sizes)
    const img1Width = 120;  // Width of all open
    const img1Height = 120; // Height of all open
    const img2Width = 120;  // Width of eyes open
    const img2Height = 120; // Height of eyes open
  
    // Define initial position for both images
    const initialX = 50;
    const initialY = canvas.height / 2 - 25;
  
    let position = {
        x: initialX,
        y: initialY
    };
  
    let showSquare = true; // Initially, show the square
  
    // Create a 'keys' object to track pressed keys
    const keys = {};
  
   // Event listener for keydown (space bar to start showing the red circle)
   window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        showSquare = false;  // Change to circle when spacebar is held down
    }
    keys[e.key] = true;
  });
  
  // Event listener for keyup (when spacebar is released, revert to the square)
  window.addEventListener('keyup', (e) => {
    if (e.key === ' ') {
        showSquare = true;  // Revert to square when spacebar is released
    }
    keys[e.key] = false;
  });
    // Updates the position for the square or circle
    function update() {
        const speed = 5; // Define movement speed
  
        // Move left if "ArrowLeft" is pressed
        if (keys['ArrowLeft']) {
            position.x -= speed;
        }
  
        // Move right if "ArrowRight" is pressed
        if (keys['ArrowRight']) {
            position.x += speed;
        }
  
        // Move up if "ArrowUp" is pressed
        if (keys['ArrowUp']) {
            position.y -= speed;
        }
  
        // Move down if "ArrowDown" is pressed
        if (keys['ArrowDown']) {
            position.y += speed;
        }
  
        // Prevent the image from moving off the canvas
        position.x = Math.max(0, Math.min(position.x, canvas.width - (showSquare ? img1Width : img2Width)));
        position.y = Math.max(0, Math.min(position.y, canvas.height - (showSquare ? img1Height : img2Height)));
    }
  
    // Function to draw the square or circle at the current position
    function draw() {
        // Clear the canvas to prevent overlap of frames
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Draw the correct image based on whether the space bar is pressed
        if (showSquare) {
            ctx.drawImage(img1, position.x, position.y, img1Width, img1Height);
        } else {
            ctx.drawImage(img2, position.x, position.y, img2Width, img2Height);
        }
    }
  
    // Game loop to update and render
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop); // Keep the loop running
    }
  
    // Start the game loop
    gameLoop();
  });