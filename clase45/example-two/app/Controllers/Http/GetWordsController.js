"use strict";

//const Producto = use('App/Models/Producto')

class GetWordsController {
  async index({ params, view }) {
    const frase = params.texto.split("%20").sort();
    return view.render("Listas", { frase });
  }
}

module.exports = GetWordsController;
