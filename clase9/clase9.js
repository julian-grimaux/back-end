const express = require('express')
const app = express()
const port = 8080
const handlebars = require("express-handlebars");

//establecemos la configuracion de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir:__dirname + "/views/partials/"
    })
);
 
//establecemos el motor de plantilla que se utiliza
app.set("view engine", "hbs");
//establecemos directorio donde se encuentran los archivos de plantilla
app.set("views", "./views");
//espacio publico del servidor
app.use(express.static("public"));


app.listen(port)














// // defino el motor de plantilla
// app.engine('cte', function (filePath, options, callback) {
//   fs.readFile(filePath, function (err, content) {
//     if (err) {
//       return callback(new Error(err));
//     }
//     const rendered = content.toString()
//                             .replace('<h1>^^titulo$$</h1>', ''+ options.title +'')
//                             .replace('<p>^^mensaje$$</p>', ''+ options.message +'')
//                             .replace('<b>^^autor$$</b>', ''+ options.autor +'')
//                             .replace('<i><b>Versión: ^^version$$</b></i>', ''+ options.version +'');
//     return callback(null, rendered);
//   });
// });
// app.set('cte1', './cte1'); // especifica el directorio de vistas
// app.set('view engine', 'cte'); // registra el motor de plantillas

// app.get('/', function (req, res) {
//     res.render('plantilla1', { 
//         title: 'yo',
//         message: 'el mas capo',
//         autor: 'yo',
//         version: 10
//     }
//     );
//   });
  
// app.listen(port)