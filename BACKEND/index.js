require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ✅ Testando a conexão com o banco
db.connect()
  .then(() => console.log('🟢 Conexão com o banco de dados estabelecida!'))
  .catch((err) => console.error('🔴 Erro ao conectar com o banco:', err.stack));

module.exports = db;

