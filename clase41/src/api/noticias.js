import config from "./config.js";
import NoticiasFactoryDAO from "../model/DAOs/noticiasFactoryDAO.js";
import Noticias from "../model/models/noticias.js";

class ApiNoticias {
  constructor() {
    this.noticiasDAO = NoticiasFactoryDAO.get(config.TIPO_PERSISTENCIA);
  }

  async obtenerNoticias(id) {
    if (id) {
      return await this.noticiasDAO.obtenerNoticias(id);
    } else {
      return await this.noticiasDAO.obtenerNoticias();
    }
  }

  async guardarNoticias(noticia) {
    ApiNoticias.asergurarNoticiaValida(noticia, true);
    return await this.noticiasDAO.guardarNoticias(noticia);
  }

  async actualizarNoticia(id, noticia) {
    ApiNoticias.asergurarNoticiaValida(noticia, false);
    return await this.noticiasDAO.actualizarNoticia(id, noticia);
  }

  async borrarNoticia(id) {
    return await this.noticiasDAO.borrarNoticia(id);
  }

  static asergurarNoticiaValida(noticia, requerido) {
    try {
      Noticias.validar(noticia, requerido);
    } catch (error) {
      throw new Error(
        "La noticia posee un formato json invalido o faltan datos" +
          error.details[0].message
      );
    }
  }
}

export default ApiNoticias;
