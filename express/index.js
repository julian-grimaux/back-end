const express = require('express')
const app = express()
const port = 8080

let visitas = 0;
let date = new Date()

app.get('/', (req,res)=>{
    res.send(`<h1>Bienvenidos al servidor express</h1>`)
})

app.get('/visitas', (req,res)=>{
    res.send(`la cantidad de visitas es ${visitas++}`)
})

app.get('/fyh', (req,res)=>{
    console.log(req)
    res.send({fyh: date})
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})