import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import validateEnv from './utils/validateEnv';
import accessLogger from './middlewares/accessLogger';
import router from './router/router';
import helpers from './views/helpers/helpers';

// Configura o dotenv para carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Valida e obtém as variáveis de ambiente essenciais
const env = validateEnv();

// Inicializa o aplicativo Express
const app = express();

// Configura o Handlebars como view engine, com o layout principal e os helpers customizados
app.engine('handlebars', engine({ defaultLayout: 'main', helpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve a pasta pública de arquivos estáticos (CSS compilado a partir do SASS, etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Habilita a leitura de dados enviados por formulários HTML (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Registra o middleware de log de acessos (formatos: 'simples' ou 'completo')
app.use(accessLogger('completo'));

// Conecta o roteador da aplicação
app.use('/', router);

// Inicia o servidor para escutar na porta definida
app.listen(env.PORT, () => {
  console.log(`[servidor]: Servidor rodando em http://localhost:${env.PORT}`);
});
