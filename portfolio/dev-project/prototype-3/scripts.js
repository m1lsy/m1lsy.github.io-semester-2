//PM Recorder
class PMrecorder { //creates a class called "PMrecorder"  ---- (classes in js are used to define an object's structure/behavior before an instance of it is created)

    //PM RECORDER CONSTRUCTOR
    constructor(attributes = {}) { 
      this.$element = attributes.element; //defeines the argument value (object) as an element
      this.$button = document.querySelector("[data-select='button']"); //selects element in the DOM with the specified attribute
      this.setupCanvas(); //calls custom method to set up canvas (method is a class's function)
      this.setupEventListeners(); //calls custom method to set up event listeners
    };
    
    //CANVAS METHOD
    setupCanvas() { //define canvas method
      const canvas = this.$element;
      const ctx = canvas.getContext("2d"); 
  
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
  
      // set size
      let size = 500;
  
      //set offset for resize
      let offset = size / 2;
  
      //set speed 
      let speed = 5;
  
      //variable to toggle between characters (FALSE = PLUSA, TRUE = MINNIE)
      let charToggle = false;
  
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
      window.addEventListener('keydown', (e) => {   //(e) => is a concise version of function(e)
        if (e.key === ' ') {                        //checks if the event's key property is equal to ' ' (a space)
          open = true; //open mouth
        }
        keys[e.key] = true;
      })
  
      window.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
          open = false; //close mouth
        }      
        keys[e.key] = false;
      })
  
      // Updates character, position, speed and size
      function update() {
        //Movement
        if (keys['a']) {
          position.x -= speed;
        }
  
        if (keys['d']) {
          position.x += speed;
        }
  
        if (keys['w']) {
          position.y -= speed;
        }
  
        if (keys['s']) {
          position.y += speed;
        }
        //Character toggle
        if (keys['p']) {
          charToggle = false;
        } 
  
        if (keys['m']) {
          charToggle = true;
        } 
  
        // if (keys['ArrowLeft']) {
        //   speed -= 5;
        // }
  
        // if (keys['ArrowRight']) {
        //   speed += 5;
        // }
        //Size
        if (keys['ArrowDown']) {
          size -= 5;
          offset = size/2;
        }
  
        if (keys['ArrowUp']) {
          size += 5;
          offset = size/2;
        }
      }
    
      function toggleBlink() {
        blink = !blink;
      }
  
      // blinking 
  
      setInterval(() => {
        toggleBlink(); 
        setTimeout(() => {
            toggleBlink(); 
        }, 100);
      }, 2600);
      
      function getSprite() {
        let sprite;
        switch (true) {
          case !open && !blink && !charToggle:
          sprite = sprites.sprClosed;
          break;
          case open && !blink && !charToggle:
          sprite = sprites.sprOpen;
          break;
          case !open && blink && !charToggle:
          sprite = sprites.sprClosedBlink;
          break;
          case open && blink && !charToggle:
          sprite = sprites.sprOpenBlink;
          break;
          case !open && !blink && charToggle:
          sprite = sprites.sprMinClosed;
          break;
          case open && !blink && charToggle:
          sprite = sprites.sprMinOpen;
          break;
          case !open && blink && charToggle:
          sprite = sprites.sprMinClosedBlink;
          break;
          case open && blink && charToggle:
          sprite = sprites.sprMinOpenBlink;
          break;
        }
        return sprite;
      }
  
      function draw() {
        // Clears canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(getSprite());
        // console.log(position);
        // console.log("Size is: " + size);
        // console.log("Position is: " + "X: " + position.x + "and Y: " + position.y);
        //  console.log("Character toggle: " + charToggle);
        // console.log("Offset is: " + offset);
        ctx.drawImage(getSprite(), position.x - offset, position.y - offset, size, size);
      }
  
      // Renderer function
      function render() {
        update();
        draw();
        requestAnimationFrame(render); // Keep the loop running
      }
  
      // Start the renderer
      render();
    }
  
    //RECORDING
  
    setupEventListeners() {
      this.$element.addEventListener("click", this.handleClick);
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
  