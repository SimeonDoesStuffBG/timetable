const http = require("http");
const fs = require("fs");

const PORT = 3000;

let client = fs.readFile("./frontend/index.html", (err, html) => {
  if (err) throw err;

  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    })
    .listen(PORT);
});

module.exports = client;
