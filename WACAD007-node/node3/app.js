require('dotenv').config(); 
const http = require('http');
const fs = require('fs').promises; // Regra: fs promises 
const path = require('path');

const server = http.createServer(async (req, res) => {
    // Regra: usar req.url para identificar o arquivo 
    let url = req.url; 
    if (url === '/' || url === '') url = '/index.html';

    const filePath = path.join(__dirname, 'public', url);
    const ext = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };

    try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
        res.end(data);
    } catch (err) {
        res.writeHead(404);
        res.end("Arquivo nao encontrado");
    }
});

// Regra: usar variável de ambiente 
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));