import "dotenv/config";
import { Pool, QueryResult } from "pg";

interface User {
  id: number;
  name: string;
  email: string;
}

const pool = new Pool({
  connectionString: process.env.DB_URL, // Usando a string de conexão completa do NeonDB
  ssl: {
    rejectUnauthorized: false,
  },
});

// Função para executar consultas
export const query = (
  text: string,
  params?: [number?, string?, string?]
): Promise<QueryResult<User>> => pool.query<User>(text, params);
