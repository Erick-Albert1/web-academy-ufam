import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World vindo do ExpTS!');
});

app.listen(port, () => {
    console.log(`[servidor]: Servidor ExpTS rodando em http://localhost:${port}`);
});