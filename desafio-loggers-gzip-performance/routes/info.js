const {Router} = require("express");
//Compresión
let compression = require('compression');
//Logger
let winstonLoggerWarn = require('../utils/winston/winstonLoggerWarn');
//
const {mostrarDatos, mostrarNumeros} = require("../controllers/info");
//const { default: pino } = require("pino");

const router = Router();

//Rutas
router.get("/info/",compression(),mostrarDatos);
router.get("/api/randoms",mostrarNumeros);
//
router.get("*",(req,res,next)=>{
    const ruta = req.baseUrl + req.path;
    winstonLoggerWarn.warn(`La ruta ${ruta} no fue implementada`);
});

module.exports = router;