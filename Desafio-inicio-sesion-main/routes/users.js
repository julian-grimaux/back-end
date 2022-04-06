let express = require('express');
let router = express.Router()
let {User} = require ('../config/schema')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

router.get('/', async (req,res,next)=>{
    const userList = await User.find()
    !userList ? res.status(500).send({message:'Usuario no encontrado'})
    : res.status(200).send(userList)
})

router.post('/', async (req,res)=>{

    const {name, email,password,isAdmin} = req.body
    let newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        isAdmin
    })
    newUser = await newUser.save()

 
    !newUser ? res.status(500).send({message:'Usuario no encontrado'})
    : res.status(200).send(newUser)
 })
    
router.post('/login', async (req,res)=>{
    let user = await User.findOne({email:req.body.email})
    let secret = process.env.SECRET;
    if(!user){
        res.status(404).send({message:'No existe este usuario'})
    }else if(user  && bcrypt.compareSync(req.body.password, user.password)){
        let token = jwt.sign(
            {
            userId: user._id,
            isAdmin: user.isAdmin
        },
        secret,
        {
            expiresIn: '1d'
        }
        );
        res.status(200).send({email:user.email,token})
    }else{
        res.status(400).send({message:'Datos incorrectos'})
    }
})

router.delete('/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id)
    .then((user)=>{
        user ? res.status(200).send({message:'Se borro correctamente'})
        : res.status(400).send({message:'Usuario no encontrado'})
    })
    .catch((error)=>{
        res,send(error.message);
    });
});

 module.exports = router;