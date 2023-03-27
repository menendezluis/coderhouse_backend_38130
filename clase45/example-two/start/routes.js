"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");
Route.get("/elsaludo", () => "Hola mama estoy programando");
Route.get("/elsaludo/:nombre", ({ params }) => {
  const saludo = `Hola ${params.nombre}!`;
  return JSON.stringify({
    message: saludo,
    user: "Luis",
  });
});

const Producto = use("App/Models/Producto");
Route.get("/productos", async ({ view }) => {
  const productos = (await Producto.all()).toJSON();
  //const productos = await Producto.all();
  const saludo = "hola clase";

  return view.render("ListarProductos", { saludo, productos });
  //return await Productos.all();
});

Route.get("/con-controller/:texto", "GetWordsController.index");
Route.get("/sin-controller/:texto", ({ params, view }) => {
  const frase = params.texto.split("%20").sort().reverse();
  return view.render("Listas", { frase });
});
