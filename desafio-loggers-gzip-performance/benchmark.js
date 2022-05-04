const automannon = require('autocannon');
const {PassThrough} = require('stream');

function run (url){
    const buf = [];
    const outputStream = new PassThrough();
    const inst = automannon({
        url,
        connections: 500,
        duration: 20
    });

    automannon.track(inst,{outputStream});

    outputStream.on("data",data=>buf.push(data));
    inst.on("done",function(){
        process.stdout.write(Buffer.concat(buf));
    })
}
console.log("Corriendo las pruebas");

run("http://localhost:8080/info");
