import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import accessLogger from './middlewares/accessLogger';
import router from './router/router';

// Configura o dotenv para carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Valida e obtém as variáveis de ambiente essenciais
const env = validateEnv();

// Inicializa o aplicativo Express
const app = express();

// Registra o middleware de log de acessos (formatos: 'simples' ou 'completo')
app.use(accessLogger('completo'));

// Conecta o roteador da aplicação
app.use('/', router);

// Inicia o servidor para escutar na porta definida
app.listen(env.PORT, () => {
  console.log(`[servidor]: Servidor rodando em http://localhost:${env.PORT}`);
});
