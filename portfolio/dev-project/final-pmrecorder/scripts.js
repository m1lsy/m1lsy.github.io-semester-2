//PM Recorder 
class PMrecorder { //creates a class called "PMrecorder"  ---- (classes in js are used to define an object's structure/behavior before an instance of it is created)

    //PM RECORDER CONSTRUCTOR
    constructor(attributes = {}) { 
      this.$element = attributes.element; //defeines the argument value (object) as an element
      this.$downloadButton = document.querySelector("[data-select='download']"); //selects download button element in the DOM with the specified attribute
      this.$recordButton = document.querySelector("[data-select='record']") //selects record button
      this.$stopButton = document.querySelector("[data-select='stop']") //selects stop button
      this.setupCanvas(); //calls custom method to set up canvas (method is a class's function)
      this.setupEventListeners(); //calls custom method to set up event listeners
    };
    
    //CANVAS METHOD
    setupCanvas() { //define canvas method
      const canvas = this.$element;
      const ctx = canvas.getContext("2d"); 
  
      //sets canvas render size to match CSS styling
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
  
      //set the character to neutral default (not blinking,mouth closed)
      let open = false;
      let blink = false;
  
      let sprites = { //initiates sprites as images
        sprClosed: new Image(),
        sprOpen: new Image(),
        sprClosedBlink: new Image(),
        sprOpenBlink: new Image(),
        sprMinClosed: new Image(),
        sprMinOpen: new Image(),
        sprMinClosedBlink: new Image(),
        sprMinOpenBlink: new Image()
      };
      
      // variables for spawn postion based on canvas size to center character
      const spawnX = canvas.width / 2;
      const spawnY = canvas.height / 2;
  
      // set position to spawnX and spawnY 
      let position = {
        x: spawnX,
        y: spawnY
      };
  
      // Set default background color
      let bgColor = "white";
  
      // set size
      let size = 500;
  
      //set offset for resize from center
      let offset = size / 2;
  
      //set speed 
      let speed = 5;
  
      //variable to toggle between characters (FALSE = PLUSA, TRUE = MINNIE)
      let minMode = false;
  
      //loads sprites from url
      sprites.sprClosed.src = '../img-nasmak/plusa-closed.png';
      sprites.sprOpen.src = '../img-nasmak/plusa-open.png';
      sprites.sprClosedBlink.src = '../img-nasmak/plusa-closedBlink.png';
      sprites.sprOpenBlink.src = '../img-nasmak/plusa-openBlink.png';
      sprites.sprMinClosed.src = '../img-nasmak/minnie-closed.png';
      sprites.sprMinOpen.src = '../img-nasmak/minnie-open.png';
      sprites.sprMinClosedBlink.src = '../img-nasmak/minnie-closedBlink.png';
      sprites.sprMinOpenBlink.src = '../img-nasmak/minnie-openBlink.png';
  
      // Create a 'keys' object to track pressed keys
      const keys = {};
  
      //check key press
      window.addEventListener('keydown', (e) => {   //(e) => is a concise version of function(e) (e is just event)
        if (e.key === 'm' || e.key === 'M') {   
          open = true; //open mouth
        }
        keys[e.key] = true;
      })
  
      window.addEventListener('keyup', (e) => {
        if (e.key === 'm' || e.key === 'M') {
          open = false; //close mouth
        }      
        keys[e.key] = false; 
      })
  
      // Updates character, position, speed and size
      function update() {
        //Movement
        if (keys['ArrowLeft']) {
          position.x -= speed;
        }
  
        if (keys['ArrowRight']) {
          position.x += speed;
        }
  
        if (keys['ArrowUp']) {
          position.y -= speed;
        }
  
        if (keys['ArrowDown']) {
          position.y += speed;
        }
      }
  
      function charToggle() {
        minMode = !minMode;
      }
    
      //control panel function
      function controlPanel() {
        const bgColorInput = document.querySelector('#bg-color');
        const spriteSizeInput = document.querySelector('#sprite-size');
        const spriteSpeedInput = document.querySelector('#sprite-speed');
        const resetButtonInput = document.querySelector('#reset-button');
        const characterSwapInput = document.querySelector('#character-swap')
  
        bgColorInput.addEventListener('input', (e) => { //bg color input
          bgColor = e.target.value;
        })
  
        spriteSizeInput.addEventListener('input', (e) => { //Size slider input into value, re calc offset
          size = parseInt(e.target.value);
          offset = size/2;
        })
  
        spriteSpeedInput.addEventListener('input', (e) => { //Speed slider input into value
          speed = parseInt(e.target.value);
        })
  
        resetButtonInput.addEventListener('click',(e) => { //Reset Button, reloads the page
          location.reload();
        })
  
        characterSwapInput.addEventListener('click',(e) => { //Swap characters
          charToggle();
        })
      }
  
      // blinking 
      function toggleBlink() {
        blink = !blink;
      }
  
      setInterval(() => {
        toggleBlink(); 
        setTimeout(() => {
            toggleBlink(); 
        }, 100);
      }, 2600);
      
      //every possible case sprite swap
      function getSprite() {
        let sprite;
        switch (true) {
          case !open && !blink && !minMode:
          sprite = sprites.sprClosed;
          break;
          case open && !blink && !minMode:
          sprite = sprites.sprOpen;
          break;
          case !open && blink && !minMode:
          sprite = sprites.sprClosedBlink;
          break;
          case open && blink && !minMode:
          sprite = sprites.sprOpenBlink;
          break;
          case !open && !blink && minMode:
          sprite = sprites.sprMinClosed;
          break;
          case open && !blink && minMode:
          sprite = sprites.sprMinOpen;
          break;
          case !open && blink && minMode:
          sprite = sprites.sprMinClosedBlink;
          break;
          case open && blink && minMode:
          sprite = sprites.sprMinOpenBlink;
          break;
        }
        return sprite;
      }
  
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.fillStyle = bgColor; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(getSprite(), position.x - offset, position.y - offset, size, size);//always center because of offset
        // console.log(getSprite());
        // console.log("Size is: " + size);
        // console.log(position);
        // console.log("Speed is: " + speed);
        // console.log("Position is: " + "X: " + position.x + "and Y: " + position.y);
        // console.log("Character swap: " + minMode);
        // console.log("Offset is: " + offset);
      }
  
      // Renderer function
      function render() {
        update();
        controlPanel();
        draw();
        requestAnimationFrame(render); // Keep the loop running
      }
  
      // Start the renderer
      render();
    }
  
    //RECORDING
  
    setupEventListeners() {
      this.$recordButton.addEventListener("click", this.handleRecord);
      this.$stopButton.addEventListener("click", this.handleStop);
    }
  
    record() {
      const chunks = [];
      const stream = this.$element.captureStream(60); // 60 FPS
      const recorder = new MediaRecorder(stream);
  
      console.log("start record");
  
      recorder.ondataavailable = (event) => {
        console.log(event);
  
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      recorder.onstop = (event) => {
        console.log("stop");
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
  
        this.$downloadButton.href = url;
        this.$downloadButton.download = "recording.webm";
      };
  
      recorder.start();
      this.recorder = recorder;
    }
  
    handleRecord = () => {
      this.$recordButton.style.display = 'none';  // Hide record button
      this.$stopButton.style.display = 'inline';  // Show stop button
      this.record();
    };
  
    handleStop = () => {
      this.recorder.stop();  // Stop the recording
      this.$downloadButton.style.display = 'inline';  // Show record button
      this.$stopButton.style.display = 'none';  // Hide stop button
    };
  
  }
  
  new PMrecorder({ element: document.querySelector("[data-component='pmrecorder']") });