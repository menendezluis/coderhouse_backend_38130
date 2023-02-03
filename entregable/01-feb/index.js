import express from "express";
import compression from "compression";
//import log4js from "log4js";
//import winston from "winston";
import logger from "pino";
const PORT = 3000;
const app = express();
app.use(compression());

let saludo = "hola que tal ";

/*log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerFile: { type: "file", filename: "debug.log" },
    miLoggerFile2: { type: "file", filename: "errores.log" },
  },
  categories: {
    default: { appenders: ["miLoggerFile2"], level: "error" },
    consola: { appenders: ["miLoggerConsole"], level: "info" },
    archivo: { appenders: ["miLoggerFile"], level: "debug" },
    archivo2: { appenders: ["miLoggerFile2"], level: "error" },
    todos: { appenders: ["miLoggerConsole", "miLoggerFile2"], level: "error" },
  },
});
*/

/*
log4js.configure({
  appenders: {
    consola: { type: "console" },
    archivo: { type: "file", filename: "errores.log" },

    loggerConsola: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info",
    },
    loggerArchivo: {
      type: "logLevelFilter",
      appender: "archivo",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsola"],
      level: "all",
    },
    custom: {
      appenders: ["loggerConsola", "loggerArchivo"],
      level: "all",
    },
  },
});
*/

//const logger = log4js.getLogger();
/*logger.trace("Trace");
logger.debug("Debug");
logger.info("Info");
logger.warn("Warn");
logger.error("Error");
logger.fatal("Fatal");
*/

/*const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({ filename: "info.log", level: "error" }),
  ],
});
*/

const child = logger().child({});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/saludo", (req, res) => {
  res.send("Hello World!");
});
app.get("/sumar", (req, res) => {
  const { a, b } = req.query;
  if (Number(a) && Number(b)) {
    //con winston
    //logger('info', "La suma es " + (parseInt(a) + parseInt(b))
    child.info("La suma es " + (parseInt(a) + parseInt(b)));
    res.send(`La suma es ${parseInt(a) + parseInt(b)}`);
  } else {
    //con winston
    //logger('error', "Los numeros no son validos")
    child.error("Los numeros no son validos");
    res.send("Los numeros no son validos");
  }
});

app.get("/saludozip", (req, res) => {
  /*for (let i = 0; i < 1000; i++) {
    saludo += "hola que tal ";
  }*/
  res.send(saludo.repeat(10000));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
