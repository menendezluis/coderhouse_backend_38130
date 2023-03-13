const express = require("express");

const app = express();
let numerosAleatorios = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/ingreso", (req, res) => {
  const { randomNumber } = req.body;
  numerosAleatorios.push(randomNumber);
  console.log("Se ha ingresado un nuevo número", numerosAleatorios);
  res.status(200).json({
    message: `El número ${randomNumber} se ha guardado correctamente`,
    todos: numerosAleatorios,
  });
});

app.delete("/egreso", (req, res) => {
  numerosAleatorios = [];
  console.log("Se ha eliminado la lista de números", numerosAleatorios);
  res.status(200).json({
    message: `Se ha eliminado la lista de números`,
    todos: numerosAleatorios,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
