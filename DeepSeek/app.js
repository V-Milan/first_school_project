import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 3D Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});

// 3D Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 5;
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: new THREE.Color("#00ffff"),
});

const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero__title", {
  duration: 1.5,
  opacity: 0,
  y: 100,
  ease: "power4.out",
});

gsap.from(".hero__visual", {
  duration: 2,
  x: 100,
  opacity: 0,
  ease: "expo.out",
  delay: 0.5,
});

// Interactive Hover Effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0)";
  });
});

// Dynamic Content Loading
const loadContent = async () => {
  const projects = await fetch("/api/projects");
  const data = await projects.json();
  populateProjects(data);
};

// Form Handling
const form = document.querySelector(".contact__form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });
  // Handle response
});
