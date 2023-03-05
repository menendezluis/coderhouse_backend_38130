class NoticiasBaseDAO {
  getNext_ID(noticias) {
    let lg = noticias.length;
    return lg ? noticias[lg - 1].id + 1 : 1;
  }

  getIndex(_id, noticias) {
    return noticias.findIndex((noticia) =>
      noticia ? noticia.id == _id : true
    );
  }
}

export default NoticiasBaseDAO;
