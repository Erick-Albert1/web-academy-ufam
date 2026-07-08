// 1. Importa as dependências necessárias
import express from 'express';
import dotenv from 'dotenv';

// 2. Configura o dotenv para carregar as variáveis de ambiente
dotenv.config();

// 3. Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3333; // Usa a porta do .env ou a porta 3333 como padrão

// 4. Define uma rota GET para a raiz da aplicação
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 5. Inicia o servidor para escutar na porta definida
app.listen(PORT, () => {
  console.log(`[servidor]: Servidor rodando em http://localhost:${PORT}`);
});