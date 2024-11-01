import * as THREE from './node_modules/three/build/three.module.js';

// Creating a scene
const scene = new THREE.Scene();

// Creating a camera
const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000); // Use 400 for width and height
camera.position.z = 5; // Move the camera back to see the globe

// Creating a WebGL renderer and set its size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400); // Match the globe-container size

// Append the renderer's canvas to the DOM
document.getElementById('globe-container').appendChild(renderer.domElement);

// Creating a globe 
const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
const globeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0077ff, // Blue color for the globe
    emissive: 0x0000ff // gives a glow effect
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe); // Add the globe to the scene

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1); // White light
light.position.set(5, 5, 5).normalize(); // Position the light
scene.add(light); // Add the light to the scene

// Adding an ambient light for soft illumination
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight); // Add ambient light to the scene

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.01; // Rotate the globe for a nice effect
    renderer.render(scene, camera);
}
animate(); // Start the animation

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = 400 / 400; // Maintain aspect ratio of globe-container
    camera.updateProjectionMatrix(); // Update camera projection matrix
    renderer.setSize(400, 400); // Set renderer size to globe-container size
});
