
// Modularização e melhorias de acessibilidade/usabilidade
(function() {
  // Utilidades de acessibilidade
  function playPopSound() {
    // Efeito sonoro simples usando Web Audio API
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = 660;
      g.gain.value = 0.08;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 120);
    } catch (e) { /* fallback: sem som */ }
  }

  // Mostrar/ocultar senha
  const senhaInput = document.getElementById('senha');
  const toggleSenha = document.getElementById('toggleSenha');
  const olhoIcon = document.getElementById('olhoIcon');
  let mostrando = false;
  if (toggleSenha && senhaInput && olhoIcon) {
    toggleSenha.addEventListener('click', function() {
      mostrando = !mostrando;
      senhaInput.type = mostrando ? 'text' : 'password';
      // Troca o ícone
      if (mostrando) {
        olhoIcon.innerHTML = '<rect x="2" y="10" width="20" height="4" fill="#ffb6d5" stroke="#ff6ec7" stroke-width="1"/><rect x="8" y="12" width="8" height="4" fill="#fff0fa" stroke="#ff6ec7" stroke-width="1"/><rect x="11" y="13" width="2" height="2" fill="#ff6ec7"/><rect x="7" y="14" width="10" height="1" fill="#ff6ec7"/>';
      } else {
        olhoIcon.innerHTML = '<rect x="2" y="10" width="20" height="4" fill="#ffb6d5" stroke="#ff6ec7" stroke-width="1"/><rect x="8" y="12" width="8" height="4" fill="#fff0fa" stroke="#ff6ec7" stroke-width="1"/><rect x="11" y="13" width="2" height="2" fill="#ff6ec7"/>';
      }
      toggleSenha.setAttribute('aria-pressed', mostrando ? 'true' : 'false');
    });
    // Acessibilidade: toggle com Enter/Espaço
    toggleSenha.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSenha.click();
      }
    });
  }

  // Feedback de erro fofo
  const btnLogin = document.getElementById('btn-login');
  const usuarioInput = document.getElementById('usuario');
  const errorDiv = document.getElementById('login-error');
  const errorMsg = document.getElementById('login-error-msg');
  const lembrarCheckbox = document.getElementById('lembrar');

  function mostrarErro(msg) {
    if (errorMsg && errorDiv) {
      errorMsg.textContent = msg + ' ';
      errorDiv.style.display = 'block';
      errorDiv.setAttribute('aria-live', 'assertive');
      playPopSound();
    }
  }
  function limparErro() {
    if (errorDiv) errorDiv.style.display = 'none';
    if (usuarioInput) usuarioInput.style.borderColor = '#ffb6d5';
    if (senhaInput) senhaInput.style.borderColor = '#ffb6d5';
  }

  // Submissão do formulário
  const form = document.querySelector('.card-login');
  if (form) {
    let loginEmProgresso = false;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (loginEmProgresso) return; // Evita submit duplo
      let erro = '';
      if (!usuarioInput.value.trim() && !senhaInput.value.trim()) {
        erro = 'Preencha usuário e senha!';
      } else if (!usuarioInput.value.trim()) {
        erro = 'Digite o usuário!';
      } else if (!senhaInput.value.trim()) {
        erro = 'Digite a senha!';
      }
      if (erro) {
        mostrarErro(erro);
        if (!usuarioInput.value.trim()) usuarioInput.focus();
        else if (!senhaInput.value.trim()) senhaInput.focus();
        usuarioInput.style.borderColor = !usuarioInput.value.trim() ? '#c2185b' : '#ffb6d5';
        senhaInput.style.borderColor = !senhaInput.value.trim() ? '#c2185b' : '#ffb6d5';
      } else {
        limparErro();
        loginEmProgresso = true;
        // Mostra animação de carregamento kawaii
        if (typeof showLoading === 'function' && typeof hideLoading === 'function') {
          showLoading();
          setTimeout(() => {
            // Simulação local de login
            const usuarioValido = 'admin';
            const senhaValida = '1234';
            const usuario = usuarioInput.value.trim();
            const senha = senhaInput.value;
            if (usuario === usuarioValido && senha === senhaValida) {
              hideLoading();
              limparErro();
              alert('Login realizado com sucesso!');
              // Redirecionar ou executar ação de sucesso aqui
            } else {
              hideLoading();
              mostrarErro('Usuário ou senha inválidos!');
              senhaInput.value = '';
              senhaInput.focus();
            }
            loginEmProgresso = false;
          }, 1200);
        } else {
          loginEmProgresso = false;
        }
      }
    });
  }

  // Prevenir colar no campo de senha
  if (senhaInput) {
    senhaInput.addEventListener('paste', function(e) {
      e.preventDefault();
      mostrarErro('Por segurança, não é permitido colar a senha.');
    });
  }

  // Carregar o estado salvo do checkbox (se existir)
  document.addEventListener('DOMContentLoaded', function() {
    const lembrarSalvo = localStorage.getItem('lembrarUsuario');
    if (lembrarSalvo === 'true' && lembrarCheckbox) {
      lembrarCheckbox.checked = true;
      const usuarioSalvo = localStorage.getItem('usuarioSalvo');
      if (usuarioSalvo && usuarioInput) {
        usuarioInput.value = usuarioSalvo;
      }
    }
  });

  // Salvar o estado do checkbox e nome de usuário quando clicar em login
  if (btnLogin && lembrarCheckbox && usuarioInput) {
    btnLogin.addEventListener('click', function() {
      if (lembrarCheckbox.checked) {
        localStorage.setItem('lembrarUsuario', 'true');
        localStorage.setItem('usuarioSalvo', usuarioInput.value);
      } else {
        localStorage.removeItem('lembrarUsuario');
        localStorage.removeItem('usuarioSalvo');
      }
    });
  }

  // Efeito sonoro ao marcar checkbox
  if (lembrarCheckbox) {
    lembrarCheckbox.addEventListener('change', function() {
      if (this.checked) playPopSound();
    });
    // Acessibilidade: toggle com Enter/Espaço
    lembrarCheckbox.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lembrarCheckbox.checked = !lembrarCheckbox.checked;
        lembrarCheckbox.dispatchEvent(new Event('change'));
      }
    });
  }
})();
