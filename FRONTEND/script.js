form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#password').value;

  const corpo = {
    email: email,
    senha: senha
  };

  console.log('➡️ Fazendo login para:', email);

  try {
    const resposta = await fetch("https://register-api-270a.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(corpo),
      headers: {
        "Content-Type": "application/json",
      },
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
