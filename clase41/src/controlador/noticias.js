import ApiNoticias from "../api/noticias.js";

class ControladorNoticias {
  constructor() {
    this.apiNoticias = new ApiNoticias();
  }

  obtenerNoticias = async (req, res) => {
    try {
      const { id } = req.params;
      const Noticias = await this.apiNoticias.obtenerNoticias(id);
      res.send(Noticias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  guardarNoticias = async (req, res) => {
    try {
      const Noticias = req.body;
      const NoticiaGuardada = await this.apiNoticias.guardarNoticias(Noticias);
      res.json(NoticiaGuardada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  actualizarNoticias = async (req, res) => {
    try {
      const { id } = req.params;
      const Noticias = req.body;
      const NoticiaActualizada = await this.apiNoticias.actualizarNoticia(
        id,
        Noticias
      );
      res.json(NoticiaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  borrarNoticias = async (req, res) => {
    try {
      const { id } = req.params;
      const NoticiaBorrada = await this.apiNoticias.borrarNoticia(id);
      res.json(NoticiaBorrada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default ControladorNoticias;
