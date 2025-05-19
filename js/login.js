// Mostrar/ocultar senha com ícone pixel art
const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');
const olhoIcon = document.getElementById('olhoIcon');
let mostrando = false;
toggleSenha.addEventListener('click', function() {
  mostrando = !mostrando;
  senhaInput.type = mostrando ? 'text' : 'password';
  // Troca o "olho" para "olho fechado" (pixel art)
  if (mostrando) {
    olhoIcon.innerHTML = '<rect x="2" y="10" width="20" height="4" fill="#ffb6d5" stroke="#ff6ec7" stroke-width="1"/><rect x="8" y="12" width="8" height="4" fill="#fff0fa" stroke="#ff6ec7" stroke-width="1"/><rect x="11" y="13" width="2" height="2" fill="#ff6ec7"/><rect x="7" y="14" width="10" height="1" fill="#ff6ec7"/>';
  } else {
    olhoIcon.innerHTML = '<rect x="2" y="10" width="20" height="4" fill="#ffb6d5" stroke="#ff6ec7" stroke-width="1"/><rect x="8" y="12" width="8" height="4" fill="#fff0fa" stroke="#ff6ec7" stroke-width="1"/><rect x="11" y="13" width="2" height="2" fill="#ff6ec7"/>';
  }
});

// Feedback de erro fofo
const btnLogin = document.getElementById('btn-login');
const usuarioInput = document.querySelector('input[name="usuario"]');
const errorDiv = document.getElementById('login-error');
const errorMsg = document.getElementById('login-error-msg');

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  let erro = '';
  if (!usuarioInput.value.trim() && !senhaInput.value.trim()) {
    erro = 'Preencha usuário e senha!';
  } else if (!usuarioInput.value.trim()) {
    erro = 'Digite o usuário!';
  } else if (!senhaInput.value.trim()) {
    erro = 'Digite a senha!';
  }
  if (erro) {
    errorMsg.textContent = erro + ' '; // espaço para o coração
    errorDiv.style.display = 'block';
    usuarioInput.style.borderColor = !usuarioInput.value.trim() ? '#ff6ec7' : '#ffb6d5';
    senhaInput.style.borderColor = !senhaInput.value.trim() ? '#ff6ec7' : '#ffb6d5';
  } else {
    errorDiv.style.display = 'none';
    usuarioInput.style.borderColor = '#ffb6d5';
    senhaInput.style.borderColor = '#ffb6d5';
    // Mostra animação de carregamento kawaii
    if (typeof showLoading === 'function' && typeof hideLoading === 'function') {
      showLoading();
      setTimeout(() => {
        hideLoading();
        // Aqui você pode colocar a lógica real de login
      }, 1800);
    }
  }
});

// Gerenciar o checkbox "Lembrar de mim"
const lembrarCheckbox = document.getElementById('lembrar');

// Carregar o estado salvo do checkbox (se existir)
document.addEventListener('DOMContentLoaded', function() {
  const lembrarSalvo = localStorage.getItem('lembrarUsuario');
  if (lembrarSalvo === 'true') {
    lembrarCheckbox.checked = true;
    
    // Se tiver dados de usuário salvos, preencher o campo
    const usuarioSalvo = localStorage.getItem('usuarioSalvo');
    if (usuarioSalvo) {
      usuarioInput.value = usuarioSalvo;
    }
  }
});

// Salvar o estado do checkbox e nome de usuário quando clicar em login
btnLogin.addEventListener('click', function() {
  if (lembrarCheckbox && lembrarCheckbox.checked) {
    localStorage.setItem('lembrarUsuario', 'true');
    localStorage.setItem('usuarioSalvo', usuarioInput.value);
  } else if (lembrarCheckbox) {
    localStorage.removeItem('lembrarUsuario');
    localStorage.removeItem('usuarioSalvo');
  }
});

// Adicionar efeito sonoro kawaii ao clicar no checkbox
if (lembrarCheckbox) {
  lembrarCheckbox.addEventListener('change', function() {
    if (this.checked) {
      // Som de "pop" kawaii (opcional - poderia ser implementado com Web Audio API)
      console.log('Checkbox marcado! Pop! ✓');
    }
  });
}
