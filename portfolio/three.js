import * as THREE from 'three';  // Import Three.js

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);  // Append renderer to the body

// Create a plane geometry for the liquid effect
const geometry = new THREE.PlaneGeometry(10, 10, 150, 150);  // Increased segments for smoother animation
const material = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 newPosition = position;
      newPosition.z = sin(position.x * 2.0 + time) * 0.5 + sin(position.y * 2.0 + time) * 0.5; // Liquid wave effect
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);  // Simple color gradient based on UV
    }
  `,
  uniforms: {
    time: { value: 0.0 }
  },
  wireframe: true
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);  // Add plane to the scene

// Position the camera
camera.position.z = 5;

// Scroll event listener to track scroll position
let scrollY = 0;  // Variable to track scroll position
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;  // Update scroll position on scroll
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update shader time uniform based on scroll position
  material.uniforms.time.value = (scrollY * 0.1) % Math.PI;  // Adjusted scaling for smooth effect

  // Camera adjustment based on scroll for more dynamic feeling
  camera.position.z = 5 + scrollY * 0.02;

  // Render the scene
  renderer.render(scene, camera);
}

animate();  // Start the animation loop
