const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const BASE_DIR = './documentos';


app.get('/arquivos', (req, res) => {
    fs.readdir(BASE_DIR, (err, files) => {
        if (err) return res.status(500).send("Erro ao listar diretório.");
        res.send(files.join('<br>'));
    });
});

//ex para testar: http://localhost:3333/arquivo/teste1.txt
app.get('/arquivo/:nome', (req, res) => {
    const nomeArquivo = req.params.nome;
    const caminhoCompleto = path.join(BASE_DIR, nomeArquivo);

    fs.readFile(caminhoCompleto, 'utf8', (err, data) => {
        if (err) return res.status(404).send("Arquivo não encontrado.");
        res.send(`<pre>${data}</pre>`);
    });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Exercício 2 rodando em http://localhost:${PORT}`);
});