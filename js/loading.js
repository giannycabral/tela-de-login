
// Modularização: encapsular em IIFE e exportar apenas o necessário
(function() {
  function showLoading() {
    let loading = document.createElement('div');
    loading.id = 'kawaii-loading';
    loading.innerHTML = `
      <div class="kawaii-loader">
        <span class="pixel-heart-loader"></span>
        <span class="kawaii-loader-text">Carregando...</span>
      </div>
    `;
    document.body.appendChild(loading);
  }

  function hideLoading() {
    const loading = document.getElementById('kawaii-loading');
    if (loading) loading.remove();
  }

  // Exporta para uso global
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
})();
