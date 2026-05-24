require('dotenv').config(); 
const http = require('http'); 
const fs = require('fs');    

const FOLDER = process.argv[2];

if (!FOLDER) {
    console.error("Erro: Informe o caminho de um diretório como parâmetro. Ex: node index.js ./public");
    process.exit(1);
}


const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    fs.readdir(FOLDER, (err, files) => {
        if (err) {
            res.end(`Erro ao acessar o diretório: ${err.message}`);
            return;
        }

        const listaFormatada = files.join('<br>');
        res.end(listaFormatada);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso!`);
    console.log(`Lendo diretório: ${FOLDER}`);
    console.log(`Acesse em: http://localhost:${PORT}`);
});