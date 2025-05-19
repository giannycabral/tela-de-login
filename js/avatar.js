// Avatar pixelado kawaii aleatório
document.addEventListener('DOMContentLoaded', function() {
  // Definição dos diferentes avatares pixel art kawaii
  const avatares = [
    // Coelhinho
    `<svg width="80" height="80" viewBox="0 0 24 24" style="image-rendering: pixelated;">
      <rect width="24" height="24" fill="none"/>
      <rect x="8" y="4" width="8" height="8" fill="#ffb6d5"/>
      <rect x="6" y="6" width="2" height="4" fill="#ffb6d5"/>
      <rect x="16" y="6" width="2" height="4" fill="#ffb6d5"/>
      <rect x="10" y="8" width="1" height="1" fill="#ff6ec7"/>
      <rect x="13" y="8" width="1" height="1" fill="#ff6ec7"/>
      <rect x="11" y="10" width="2" height="1" fill="#ff6ec7"/>
      <rect x="7" y="12" width="10" height="4" fill="#ffb6d5"/>
    </svg>`,
    
    // Gatinho
    `<svg width="80" height="80" viewBox="0 0 24 24" style="image-rendering: pixelated;">
      <rect width="24" height="24" fill="none"/>
      <rect x="8" y="6" width="8" height="8" fill="#ffb6d5"/>
      <rect x="6" y="4" width="2" height="4" fill="#ffb6d5"/>
      <rect x="16" y="4" width="2" height="4" fill="#ffb6d5"/>
      <rect x="10" y="10" width="1" height="1" fill="#ff6ec7"/>
      <rect x="13" y="10" width="1" height="1" fill="#ff6ec7"/>
      <rect x="10" y="12" width="4" height="1" fill="#ff6ec7"/>
      <rect x="9" y="13" width="1" height="1" fill="#ff6ec7"/>
      <rect x="14" y="13" width="1" height="1" fill="#ff6ec7"/>
    </svg>`,
    
    // Ursinho
    `<svg width="80" height="80" viewBox="0 0 24 24" style="image-rendering: pixelated;">
      <rect width="24" height="24" fill="none"/>
      <rect x="8" y="6" width="8" height="8" fill="#ffb6d5"/>
      <rect x="6" y="8" width="2" height="2" fill="#ffb6d5"/>
      <rect x="16" y="8" width="2" height="2" fill="#ffb6d5"/>
      <rect x="10" y="10" width="1" height="1" fill="#ff6ec7"/>
      <rect x="13" y="10" width="1" height="1" fill="#ff6ec7"/>
      <rect x="11" y="12" width="2" height="1" fill="#ff6ec7"/>
      <rect x="8" y="14" width="8" height="2" fill="#ffb6d5"/>
    </svg>`,
    
    // Estrela
    `<svg width="80" height="80" viewBox="0 0 24 24" style="image-rendering: pixelated;">
      <rect width="24" height="24" fill="none"/>
      <path d="M12 4l2 5h6l-4 4 2 6-6-3-6 3 2-6-4-4h6z" fill="#ffb6d5"/>
      <rect x="11" y="10" width="2" height="1" fill="#ff6ec7"/>
      <rect x="10" y="13" width="1" height="1" fill="#ff6ec7"/>
      <rect x="13" y="13" width="1" height="1" fill="#ff6ec7"/>
    </svg>`
  ];
  
  // Seleciona um avatar aleatório
  const avatarAleatorio = avatares[Math.floor(Math.random() * avatares.length)];
  
  // Adiciona o avatar ao container
  const avatarContainer = document.getElementById('avatar-container');
  if (avatarContainer) {
    avatarContainer.innerHTML = avatarAleatorio;
    
    // Adiciona animação ao avatar
    const avatarSVG = avatarContainer.querySelector('svg');
    if (avatarSVG) {
      avatarSVG.classList.add('animated-avatar');
    }
    
    // Adiciona interatividade ao avatar
    avatarContainer.addEventListener('click', function() {
      // Adiciona efeito de "felicidade" quando clica no avatar
      avatarContainer.classList.add('avatar-happy');
      
      // Cria elementos de partículas kawaii
      createKawaiiParticles(avatarContainer);
      
      // Remove a classe depois da animação
      setTimeout(() => {
        avatarContainer.classList.remove('avatar-happy');
      }, 1000);
    });
  }
  
  // Função para criar partículas kawaii quando clica no avatar
  function createKawaiiParticles(container) {
    const particlesCount = 10;
    const colors = ['#ff6ec7', '#ffb6d5', '#fff0fa', '#ffcbf2'];
    const shapes = ['✧', '♥', '★', '♡', '☆'];
    
    // Limpar partículas anteriores
    const oldParticles = document.querySelectorAll('.kawaii-particle');
    oldParticles.forEach(p => p.remove());
    
    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'kawaii-particle';
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      
      // Estilo das partículas
      particle.style.position = 'absolute';
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.fontSize = `${Math.random() * 14 + 10}px`;
      particle.style.top = '50%';
      particle.style.left = '50%';
      particle.style.zIndex = '100';
      particle.style.opacity = '1';
      particle.style.pointerEvents = 'none';
      particle.style.textShadow = '0 0 5px #fff, 0 0 10px #ffb6d5';
      
      container.appendChild(particle);
      
      // Animação aleatória para cada partícula
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 20;
      const duration = Math.random() * 1000 + 500;
      
      // Definir a animação de cada partícula com keyframes
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(0.5)',
          opacity: 1
        },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.2)`,
          opacity: 0.8
        },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * (distance + 20)}px), calc(-50% + ${Math.sin(angle) * (distance + 20)}px)) scale(0)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
        fill: 'forwards'
      });
      
      // Remove a partícula após a animação
      setTimeout(() => particle.remove(), duration);
    }
  }
  
  // Adiciona a classe CSS para efeito de felicidade
  const style = document.createElement('style');
  style.textContent = `
    .avatar-happy svg {
      transform: scale(1.2) rotate(5deg);
      transition: transform 0.3s ease-out;
      filter: brightness(1.2);
    }
    
    @keyframes particle-float {
      0% { transform: translateY(0) rotate(0); opacity: 1; }
      100% { transform: translateY(-50px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});
