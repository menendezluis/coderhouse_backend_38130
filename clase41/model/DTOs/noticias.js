function noticiaDTO (noticia,_id,fyh){

    return {
        ...noticia,
        _id,
        fyh
    }
}