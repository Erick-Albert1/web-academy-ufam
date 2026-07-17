const http = require("http");

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    console.log("Mensagem recebida do frontend:", body);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Mensagem recebida pelo backend!");
  });
});

server.listen(4000, () => {
  console.log("Backend rodando na porta 4000");
});
