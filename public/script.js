// Three.js Scene Setup (Only for Home Page)
if (document.getElementById('three-canvas')) {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
  
      const particles = [];
      const particleCount = 20;
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true });
  
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        );
        particle.rotationSpeed = Math.random() * 0.01;
        particles.push(particle);
        scene.add(particle);
      }
  
      camera.position.z = 30;
  
      let mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      });
  
      function animate() {
        requestAnimationFrame(animate);
        particles.forEach(p => {
          p.rotation.x += p.rotationSpeed;
          p.rotation.y += p.rotationSpeed;
          p.position.z += Math.sin(Date.now() * 0.001 + p.position.x) * 0.05;
        });
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();
  
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (error) {
      console.error('Error initializing Three.js:', error);
    }
  }
  
  // Dark Mode Toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('.icon');
      icon.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    });
  }
  
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navCenter = document.querySelector('.nav-center');
  if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navCenter.classList.toggle('active');
    });
  }