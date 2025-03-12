import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DB_URL, // Usando a string de conexão completa do NeonDB
  ssl: {
    rejectUnauthorized: false,
  },
});

// Função para executar consultas
export const query = (text: string, params?: any[]): Promise<any> =>
  pool.query(text, params);
