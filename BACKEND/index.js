require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('🟢 Conexão com o banco de dados estabelecida!'))
  .catch((err) => console.error('🔴 Erro ao conectar com o banco:', err.stack));

module.exports = db;
