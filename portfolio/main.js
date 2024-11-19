// Create the circle cursor element
const cursor = document.createElement('div');
cursor.classList.add('circle-cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

let slider = document.querySelector('.slider');
let innerSlider = document.querySelector('.slider-inner');
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
slider.addEventListener('mouseup', () => {
  pressed = false; // Stop dragging
  slider.style.cursor = 'grab'; // Back to grab cursor
  e.preventDefault(); // Prevent any unwanted default action on release
});

// When mouse is moved
slider.addEventListener('mousemove', (e) => {
  if (!pressed) return; // Stop if the mouse is not pressed
  e.preventDefault(); // Prevent default text selection or other behavior

  const x = e.pageX - slider.offsetLeft; // Current X position
  const walk = x - startX; // Distance moved
  innerSlider.style.transform = `translateX(${offsetX + walk}px)`; // Move the inner slider
});

// When the mouse button is released, update the offset position
slider.addEventListener('mouseup', () => {
  pressed = false;
  offsetX += parseFloat(innerSlider.style.transform.match(/-?\d+/)[0]); // Update offset with the current position
  slider.style.cursor = 'grab'; // Back to grab cursor
});

// Ensure the custom cursor moves only when visible
document.addEventListener('mousemove', (e) => {
  if (cursor.style.display !== 'none') {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  }
});

// three js
import * as THREE from 'three';

console.log('Three.js version:', THREE.REVISION);

const scene = new THREE.Scene();
console.log('Scene created:', scene);
