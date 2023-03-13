const http = require("http");

const server = http.createServer((req, res) => {
  let currentDate = new Date().toISOString();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  const jsonContent = JSON.stringify(currentDate);

  res.end(jsonContent);
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
