import express from "express";
import fruitRoutes from "./routes/fruitRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Habilita leitura de JSON no body
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.json({ message: "Fruits API funcionando!" });
});

// Rotas de frutas
app.use("/fruits", fruitRoutes);

// Middleware para rotas não encontradas (depois das rotas)
app.use(notFoundHandler);

// Middleware global de erros (sempre por último)
app.use(errorHandler);

export default app;