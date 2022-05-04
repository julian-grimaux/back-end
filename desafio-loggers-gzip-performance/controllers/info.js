const {response, request} = require("express");
let numCPUs = require('os').cpus().length;
//Logger
let winstonLoggerInfo = require('../utils/winston/winstonLoggerInfo');
//
let { fork } = require("child_process");
//
//Mostrar información
const mostrarDatos = async(req=request,res=response,next)=>{
    const ruta = req.baseUrl + req.path;
    winstonLoggerInfo.info(`Llamado a La ruta ${ruta}`);
    //console.log(`Llamado a La ruta ${ruta}`);
    res.render("../info",{
        argumentos:JSON.stringify(process.argv.slice(2)),
        plataforma:process.platform,
        version:process.version,
        memoria:JSON.stringify(process.memoryUsage()),
        pathEjecucion:process.execPath,
        pid:process.pid,
        carpeta:process.cwd(),
        totalProcesadores:numCPUs
    });
}
//Mostrar información
const mostrarNumeros = async(req=request,res=response,next)=>{
    const ruta = req.baseUrl + req.path;
    winstonLoggerInfo.info(`Llamado a La ruta ${ruta}`);
    let cant = req.query.cant?parseInt(req.query.cant):100000000;
    /*let child_process = fork("./controllers/child_process.js");
    child_process.send(cant);
    //console.log(cant);
    child_process.on("message", data =>{
        console.log("Mensaje recibido del child: ",data);
        res.render("../numerosAleatorios",{rpta:JSON.stringify(data.res)});
    })*/
    console.log(cant);
    res.render("../numerosAleatorios",{rpta:cant});
}

module.exports = {
    mostrarDatos,
    mostrarNumeros
}