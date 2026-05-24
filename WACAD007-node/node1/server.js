const express = require('express');
const fs = require('fs');
const app = express();


const FOLDER = process.argv[2];


if (!FOLDER) {
    console.error("Erro: Informe um diretório como parâmetro.");
    process.exit(1);
}


app.get('/', (req, res) => {
    fs.readdir(FOLDER, (err, files) => {
        if (err) {
            return res.status(500).send(`Erro ao ler o diretório: ${err.message}`);
        }


        const listaHTML = files.join('<br>');
        res.send(`<h1>Conteúdo de ${FOLDER}</h1>${listaHTML}`);
    });
});


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
    console.log(`Lendo pasta: ${FOLDER}`);
});