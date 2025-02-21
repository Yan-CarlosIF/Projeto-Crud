import express from "express";
import cors from "cors";
import { query } from "./database";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/users", async (req: any, res: any) => {
  try {
    const result = await query("SELECT * FROM public.users");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/:id", async (req: any, res: any) => {
  try {
    const result = await query("SELECT * FROM public.users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users", async (req: any, res: any) => {
  try {
    const { id, name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing name or email" });
    }

    const result = await query(
      "INSERT INTO public.users (id, name, email) VALUES ($1, $2, $3) RETURNING *",
      [id, name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/users/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await query(
      "UPDATE public.users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(result);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/users/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM public.users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(204).json();
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };
