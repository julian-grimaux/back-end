const express = require('express')
const {Router} = express

const app = express()
const personas = Router()
const mascotas = Router()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

let arrayMascotas = ['perro', 'gato', 'pez']


mascotas.get('/', (req,res)=>{
    res.send(arrayMascotas)
})

mascotas.post('/', (req,res)=>{
    const name = req.body.name
    arrayMascotas.push(name)

    res.send(arrayMascotas)
})

app.use('/mascotas',mascotas)
app.use('/personas',personas)
app.use('/static', express.static('public'))

app.listen(8080)