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
