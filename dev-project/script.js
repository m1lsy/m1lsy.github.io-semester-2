

//classes in js are used to define an object's structure/behavior before an instance of it is created
class PMrecorder { //creates a class called "PMrecorder"
    constructor(attributes = {}) { 
      this.$element = attributes.element; //defeines the argument value (object) as an element
      this.$button = document.querySelector("[data-select='button']"); //selects element in the DOM with the specified attribute
      this.setupCanvas(); //calls custom method to set up canvas (method is a class's function)
      this.setupEventListeners(); //calls custom method to set up event listeners
    }
  
    setupCanvas() { //the custom method to set up the canvas
      const canvas = this.$element;
      const ctx = canvas.getContext("2d");
      // Define initial position for both shapes (same starting position)
      const initialX = 50;
      const initialY = canvas.height / 2 - 25;
  
      // Define the shared position and speed (both shapes will share these)
      let position = {
          x: initialX,
          y: initialY
      };
  
      // Defining square (blue) and circle (red) properties
      const square = {
          size: 50,
          color: 'blue',
          speed: 5
      };
  
      const circle = {
          radius: 25,
          color: 'red',
          speed: 5
      };
  
      // State variable to track which shape is being shown
      let showSquare = true; // Initially, the square is visible
  
      // Create a 'keys' object to track pressed keys
      const keys = {};
  
      // Event listener for keydown (space bar to start showing circle)
      window.addEventListener('keydown', (e) => {
          if (e.key === ' ') {  // Space bar key
              showSquare = false;  // Change to circle when space bar is pressed
          }
          keys[e.key] = true;
      });
  
      window.addEventListener('keyup', (e) => {
          if (e.key === ' ') {  // Space bar key
              showSquare = true;   // Change back to square when space bar is released
          }
          keys[e.key] = false;
      });
  
      // Updates position (x and y) for both square and circle
      function update() {
          // Move left if "ArrowLeft" is pressed
          if (keys['ArrowLeft']) {
              position.x -= square.speed;
          }
  
          // Move right if "ArrowRight" is pressed
          if (keys['ArrowRight']) {
              position.x += square.speed;
          }
  
          // Move up if "ArrowUp" is pressed
          if (keys['ArrowUp']) {
              position.y -= square.speed;
          }
  
          // Move down if "ArrowDown" is pressed
          if (keys['ArrowDown']) {
              position.y += square.speed;
          }
  
          // Prevent the square or circle from moving off the canvas
          position.x = Math.max(0, Math.min(position.x, canvas.width - (showSquare ? square.size : circle.radius * 2)));
          position.y = Math.max(0, Math.min(position.y, canvas.height - (showSquare ? square.size : circle.radius * 2)));
      }
  
      // Function to draw the square or circle at the current position
      function draw() {
          // Clears canvas so that each frame does not stay on canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draw the correct shape based on if space bar is pressed or nox
          if (showSquare) {
              ctx.fillStyle = square.color;
              ctx.fillRect(position.x, position.y, square.size, square.size);
          } else {
              ctx.fillStyle = circle.color;
              ctx.beginPath();
              ctx.arc(
                  position.x + square.size / 2, // Center horizontally to center circlr and square
                  position.y + square.size / 2, // Center vertically
                  circle.radius, 
                  0, 
                  Math.PI * 2
              );
              ctx.fill();
          }
      }
  
  
      // Game loop to update and render, ensures smooth animation
      function gameLoop() {
          update();
          draw();
          requestAnimationFrame(gameLoop); // Keep the loop running
      }
  
      // Start the game loop
      gameLoop();
  
    }
  
    setupEventListeners() {
      this.$element.addEventListener("click", this.handleClick);
    }
  
    record() {
      const chunks = [];
      const stream = this.$element.captureStream(60); // 30 FPS
      const recorder = new MediaRecorder(stream);
  
      console.log("start record");
  
      recorder.ondataavailable = (event) => {
        console.log(event);
  
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      recorder.onstop = (event) => {
        console.log("stop ");
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
  
        this.$button.href = url;
        this.$button.download = "recording.webm";
      };
  
      recorder.start();
  
      setTimeout(() => {
        recorder.stop();
      }, 5000);
  
    }
  
    handleClick = () => {
      this.record();
    };
  }
  
  new PMrecorder({ element: document.querySelector("[data-component='pmrecorder']") });
  