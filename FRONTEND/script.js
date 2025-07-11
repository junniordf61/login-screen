require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`[REQUISIÇÃO] ${req.method} ${req.url}`);
  next();
});

// Teste
app.get('/', (req, res) => {
  res.send('API of Carlos is online!');
});

// Rota POST
app.post('/usuarios', async (req, res) => {
  console.log('🛠️ Rota POST /usuarios foi chamada');
  console.log('Body recebido e usuário foi cadastrado:', req.body);

  const { name, email, senha } = req.body;

  try {
    const passwordHashed = await bcrypt.hash(senha, 10);

    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHashed]
    );

    return res.status(201).json({
      mensagem: 'User successfully registered',
      usuario: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Error registering user',
      detalhe: error.message
    });
  }
});

// MIDDLEWARE DE ERRO 
app.use((err, req, res, next) => {
  console.error('🔥 Erro não tratado:', err.stack);
  res.status(500).send('Erro interno do servidor');
});


//Listar usuários

app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email, created_at FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      erro: 'Erro ao buscar usuários',
      detalhe: error.message
    });
  }
});






app.post('/usuarios', async (req, res) => {
  const { name, email, senha } = req.body;

  try {
    // Verifica se já existe um email igual
    const existente = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existente.rows.length > 0) {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }

    // Criptografa a senha
    const passwordHashed = await bcrypt.hash(senha, 10);

    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHashed]
    );

    return res.status(201).json({
      mensagem: 'User successfully registered',
      usuario: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao cadastrar usuário',
      detalhe: error.message
    });
  }
});


app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.password);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    return res.status(200).json({
      mensagem: 'Login bem-sucedido',
      usuario: {
        id: usuario.id,
        nome: usuario.name,
        email: usuario.email
      }
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao fazer login', detalhe: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`✅ Server running in http://localhost:${PORT}`);
});