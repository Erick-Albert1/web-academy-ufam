const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h1>Enviar mensagem para o backend</h1>
          <form method="POST" action="/">
            <input type="text" name="mensagem" />
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    `);
    return;
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const dados = querystring.parse(body);
      const mensagem = dados.mensagem;

      const options = {
        hostname: "backend",
        port: 4000,
        path: "/",
        method: "POST",
        headers: { "Content-Type": "text/plain" },
      };

      const reqBackend = http.request(options, (resBackend) => {
        resBackend.on("data", () => {});
        resBackend.on("end", () => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(
            `<p>Mensagem "${mensagem}" enviada ao backend!</p><a href="/">Voltar</a>`
          );
        });
      });

      reqBackend.write(mensagem);
      reqBackend.end();
    });
    return;
  }
});

server.listen(3000, () => {
  console.log("Frontend rodando na porta 3000");
});
