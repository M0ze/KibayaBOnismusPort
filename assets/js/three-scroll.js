// --- Three.js Scrolling Particle Effect ---

let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xecf0f1, 0); // Match background color, 0 alpha
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Particles
    const particleCount = 5000;
    particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    window.updateParticleColor = function() {
        if (document.body.classList.contains('dark-mode')) {
            particleMaterial.color.set(0x3498db); // Bright Blue for dark mode
        } else {
            particleMaterial.color.set(0x34495e); // Dark Gray for light mode
        }
    };

    // Initial color set
    window.updateParticleColor();

    // Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('scroll', onScroll, false);
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    particleSystem.rotation.y = time * 0.5;

    renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function onScroll() {
    particleSystem.position.y = window.scrollY * 0.3;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();