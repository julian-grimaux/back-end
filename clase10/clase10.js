const express = require('express')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/datos', (req, res) =>{
    res.render('nivel',req.query)
})

app.listen(8080)