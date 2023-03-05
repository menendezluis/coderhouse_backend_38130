import noticiaDTO from "../DTOs/noticia.js";
import NoticiasBaseDAO from "./noticias.js";

class NoticiasMemFileDAO extends NoticiasBaseDAO {
  constructor() {
    super();
    this.noticias = [];
  }

  obtenerNoticias = async (_id) => {
    try {
      if (_id) {
        let index = this.noticias.findIndex((noticia) => noticia._id == _id);
        return index >= 0 ? this.noticias[index] : [];
      }
      return this.noticias;
    } catch (error) {
      console.log("error al obtener noticias", error);
      return [];
    }
  };

  guardarNoticias = async (noticia) => {
    try {
      let _id = this.getNext_ID(this.noticias);
      let fyh = new Date();
      let noticiaGuardada = noticiaDTO(noticia, _id, fyh);

      this.noticias.push(noticiaGuardada);
      return noticiaGuardada;
    } catch (error) {
      console.log("error al guardar noticias", error);
      let noticia = {};
      return noticia;
    }
  };

    actualizarNoticia = async (_id, noticia) => {
        try {
            let fyh = new Date().toLocaleString();
            let noticiaNew = noticiaDTO(noticia, _id, fyh);

            let index = this.getIndex(_id, this.noticias);
            let noticiaActual = this.noticias[index] || {};

            let noticiaActualizada = { ...noticiaActual, ...noticiaNew };

            index >=0 ?
                this.noticias.splice(index, 1, noticiaActualizada) :
                this.noticias.push(noticiaActualizada)

            return noticiaActualizada;
        }
        catch (error) {
            console.log("error al actualizar noticias", error);
            let noticia = {};

            return noticia;
        }
    }

    borrarNoticia = async (_id) => {
        try {
            let index = this.getIndex(_id, this.noticias);
            let noticiaBorrada = this.noticias.splice(index, 1)[0]


            return noticiaBorrada;
        }
        catch (error) {
            console.log("error al borrar noticias", error);
            let noticia = {};

            return noticia;
        }
    }

    guardarNoticia = async (noticia) => {
        try {
            let _id = this.getNext_ID(this.noticias);
            let fyh = new Date().toLocaleString();
            let noticiaGuardada = noticiaDTO(noticia, _id, fyh);

            this.noticias.push(noticiaGuardada);
            return noticiaGuardada;
        }
        catch (error) {
            console.log("error al guardar noticias", error);
            let noticia = {};

            return noticia;
        }
    }
}
