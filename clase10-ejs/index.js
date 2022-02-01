const express = require('express')
const app = express()

const personas = []

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.set('views', './views' )

app.get('/', (req, res) =>{
    res.render('inicio', {personas});
})

app.post('/personas', (req,res) =>{
    personas.push(req.body)
    console.log(personas)
    res.redirect('/')
})

app.listen(8080)