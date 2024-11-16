import * as THREE from 'three';
 
//scene

const scene = new THREE.Scene();
 
//creating sphere
const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshStandardMaterial(
   { color: 0xffff00 } ); 
const mesh  = new THREE.Mesh( geometry, material ); 
scene.add( mesh );

//creating camera
const camera = new T

//renderer
const canvas = document.querySelector('.webgl' );
const render = new THREE.WebGLRenderer({canvas});
renderer.setSize(800, 600);
renderer.render(scene, camera);