import "dotenv/config";
import { Pool } from "pg";

console.log(process.env.DB_URL);

const pool = new Pool({
  connectionString: process.env.DB_URL, // Usando a string de conexão completa do NeonDB
  ssl: {
    rejectUnauthorized: false,
  },
});

// Tentativa de conexão
pool
  .connect()
  .then(() => console.log("🔥 Banco de dados conectado com sucesso!"))
  .catch((err) =>
    console.error("❌ Erro ao conectar ao banco de dados:", err.message)
  );

// Função para executar consultas
export const query = (text: string, params?: any[]): Promise<any> =>
  pool.query(text, params);
