const form = document.getElementById('form-cadastro');
const msgErro = document.getElementById('mensagem-erro');
const msgSucesso = document.getElementById('mensagem-sucesso');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  msgErro.textContent = '';
  msgSucesso.textContent = '';

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const name = `${firstName} ${lastName}`;
  const email = document.getElementById('input-email').value.trim();
  const senha = document.getElementById('input-password').value.trim();

  //  VALIDAÇÃO SIMPLES
  if (!firstName || !lastName || !email || !senha) {
    msgErro.textContent = 'Preencha todos os campos.';
    return;
  }

  //  VERIFICA SE EMAIL É VÁLIDO
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    msgErro.textContent = 'Informe um email válido.';
    return;
  }

  msgSucesso.textContent = '⏳ Enviando...';

  try {
    const resposta = await fetch('https://register-api-270a.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      msgSucesso.textContent = '✅ Cadastro realizado com sucesso!';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      msgErro.textContent = '❌ ' + dados.erro;
      msgSucesso.textContent = '';
    }
  } catch (erro) {
    msgErro.textContent = '🚨 Erro de conexão com o servidor.';
    msgSucesso.textContent = '';
  }
});
