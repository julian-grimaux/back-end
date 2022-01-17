const express = require('express')
const app = express()
const port = 8080

const frase = 'Hola mundo cómo están'

app.get('/api/frase',(req,res)=>{
    res.send(`<h1>${frase}</h1>`)
})

app.get('/api/letras/:num',(req,res)=>{
    res.send()
})

app.get('/api/palabras/:num',(req,res)=>{
    res.send()
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})