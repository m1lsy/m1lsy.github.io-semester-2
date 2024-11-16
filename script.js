// Create the circle cursor element
const cursor = document.createElement('div');
cursor.classList.add('circle-cursor');
document.body.appendChild(cursor);

// Update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;  // Corrected template literal
  cursor.style.top = `${e.pageY}px`;   // Corrected template literal
});
