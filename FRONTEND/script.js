const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#password').value;


  console.log('➡️ Fazendo login para:', email);

  try {
    const resposta = await fetch('https://register-api.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
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
