import PersonasDaoMem from "./MemClasses.js";
import PersonasDaoFile from "./FileClasses.js";

const dao = new PersonasDaoMem();
const nuevaPersona = { nombre: "Juan", apellido: "Pérez", dni: "12345678" };
const personaDos = { nombre: "Ana", apellido: "Gómez", dni: "87654321" };
const personaTres = { nombre: "Pedro", apellido: "García", dni: "12345678" };
const runMyData = async () => {
  await dao.crearPersona(nuevaPersona);
  await dao.crearPersona(personaDos);
  await dao.crearPersona(personaTres);

  const personas = await dao.obtenerPersonas();

  console.log(personas);
};

//runMyData();

const runMyDataFile = async () => {
  const daoFile = new PersonasDaoFile("personas.json");
  await daoFile.crearPersona(nuevaPersona);
  await daoFile.crearPersona(personaDos);
  await daoFile.crearPersona(personaTres);

  const personas = await daoFile.obtenerPersonas();

  console.log(personas);
};

runMyDataFile();
