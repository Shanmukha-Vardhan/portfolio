// Three.js Scene Setup (Only for Home Page)
if (document.getElementById('three-canvas')) {
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
  
  // Scroll Animations
  const sections = document.querySelectorAll('.intro, .skills, .featured-project, .projects, .resume, .about, .contact-section, .internship-banner');
  const items = document.querySelectorAll('.skill-item, .project-card, .section, .about-content p');
  
  const observerOptions = {
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => sectionObserver.observe(section));
  items.forEach(item => itemObserver.observe(item));
  
  // Fetch Projects (Only for What Do I Do Page)
  if (document.getElementById('project-grid')) {
    let visibleProjects = 4;
    const projectsPerLoad = 4;
  
    fetch('/api/projects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const grid = document.getElementById('project-grid');
        if (!data || !data.projects) {
          throw new Error('No projects found in data');
        }
  
        const renderProjects = () => {
          grid.innerHTML = '';
          const projectsToShow = data.projects.slice(0, visibleProjects);
          projectsToShow.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
              <div class="placeholder-image"></div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            `;
            grid.appendChild(card);
          });
  
          const showMoreButton = document.getElementById('show-more');
          if (visibleProjects >= data.projects.length) {
            showMoreButton.style.display = 'none';
          } else {
            showMoreButton.style.display = 'inline-block';
          }
        };
  
        renderProjects();
  
        document.getElementById('show-more').addEventListener('click', (e) => {
          e.preventDefault();
          visibleProjects += projectsPerLoad;
          renderProjects();
        });
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        const grid = document.getElementById('project-grid');
        grid.innerHTML = '<p style="color: #666; text-align: center;">Failed to load projects. Please try again later.</p>';
      });
  }