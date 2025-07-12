document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#login-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#password').value;

    const corpo = { email, senha };

    try {
      const resposta = await fetch("https://register-api-270a.onrender.com/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('usuarioLogado', JSON.stringify(dados.usuario));
        window.location.href = 'dashboard.html';
      } else {
        alert('❌ Erro: ' + dados.erro);
      }
    } catch (erro) {
      alert('🚨 Erro de conexão com o servidor!');
    }
  });
});
