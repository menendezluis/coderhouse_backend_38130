import { Router } from "express";
import ControladorNoticias from "../controllers/noticias.js";

const router = Router();

class RouterNoticias {
  constructor() {
    this.controladorNoticias = new ControladorNoticias();
  }

  start() {
    router.get("/:id", this.controladorNoticias.obtenerNoticias);
    router.post("/", this.controladorNoticias.guardarNoticias);
    router.put("/:id", this.controladorNoticias.actualizarNoticias);
    router.delete("/:id", this.controladorNoticias.eliminarNoticias);
    return router;
  }
}
export default RouterNoticias;
