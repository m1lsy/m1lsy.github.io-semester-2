// Create the circle cursor element
const cursor = document.createElement('div');
cursor.classList.add('circle-cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Slider functionality
const slider = document.querySelector('.slider');
const innerSlider = document.querySelector('.slider-inner');
let pressed = false; // Tracks if the mouse is pressed
let startX; // Starting X position of the drag
let offsetX = 0; // Tracks the current position of the slider

// Hide the custom cursor when over the slider and show a 'grab' cursor
slider.addEventListener('mouseenter', () => {
  cursor.style.display = 'none'; // Hide the custom cursor
  slider.style.cursor = 'grab'; // Show grab cursor
});

slider.addEventListener('mouseleave', () => {
  cursor.style.display = 'block'; // Show the custom cursor
  slider.style.cursor = 'default'; // Reset cursor to default
  pressed = false; // Ensure dragging stops when leaving slider
});

// When mouse is pressed on the slider
slider.addEventListener('mousedown', (e) => {
  pressed = true;
  slider.style.cursor = 'grabbing'; // Show grabbing cursor
  startX = e.pageX - slider.offsetLeft; // Record starting X position
  e.preventDefault(); // Prevent text selection and dragging image on default
});

// When mouse is released
document.addEventListener('mouseup', () => {
  if (pressed) {
    pressed = false; // Stop dragging
    slider.style.cursor = 'grab'; // Back to grab cursor
    offsetX += parseFloat(innerSlider.style.transform.match(/-?\d+/)?.[0] || 0); // Update offset with the current position
  }
});

// When mouse is moved
slider.addEventListener('mousemove', (e) => {
  if (!pressed) return; // Stop if the mouse is not pressed
  e.preventDefault(); // Prevent default text selection or other behavior

  const x = e.pageX - slider.offsetLeft; // Current X position
  const walk = x - startX; // Distance moved
  innerSlider.style.transform = `translateX(${offsetX + walk}px)`; // Move the inner slider
});

// Ensure the custom cursor moves only when visible
document.addEventListener('mousemove', (e) => {
  if (cursor.style.display !== 'none') {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  }
});
const imageContainers = document.querySelectorAll('.image-container');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY; // Current vertical scroll position
    const windowHeight = window.innerHeight; // Height of the viewport

    imageContainers.forEach((container) => {
        const rect = container.getBoundingClientRect(); // Get image's position
        const imageOffset = rect.top; // Distance from top of viewport
        const visiblePercentage = Math.max(0, Math.min(1, 1 - imageOffset / windowHeight)); // Clamp to 0-1

        // Apply the scaling effect only on the bottom part of the image
        const scaleValue = 1 + visiblePercentage * 0.1; // Adjust scaling factor (0.1 for subtle effect)

        // We adjust the scale on the X-axis, with a focus on the bottom part
        if (visiblePercentage > 0) {
            container.querySelector('img').style.transform = `scaleX(${scaleValue})`; // Apply scaleX transformation
        }
    });
});
