import config from "./config.js";
import express from "express";
import cors from "cors";
import RouterNoticias from "./routes/noticias.js";

const app = express();

if (config.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const routerNoticias = new RouterNoticias();

app.use("/noticias", routerNoticias.start());
//Iniciar el servidor

const PORT = config.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(
    `Servidor express escuchando en el puerto ${
      server.address().port
    } en modo ${config.NODE_ENV}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
