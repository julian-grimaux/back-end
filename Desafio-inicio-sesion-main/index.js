require('dotenv/config')
let express=require("express")
let path = require("path");
let expressSession = require("express-session");
let {Server:IOServer}=require("socket.io")
let {Server: HttpServer} = require("http")
let cors = require("cors")
let passport = require('passport')
let app = express();
let mongoose = require("mongoose")
let passportStrategy = require('passport-local').Strategy;
let  httpServer= new HttpServer(app)
let io = new IOServer (httpServer)
let usuarios =[]

let ProdController = require("./controller/ProdcutoController")
let controller = new ProdController()

let productoRouter =require("./routes/productos")
let usersRouter = require("./routes/users")


const PORT = process.env.PORT || 8080

//conexion
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Nos conectamos a MongoDb')
})
.catch((error)=>{
    console.log(error);
})


//setting
app.use(cors())
app.options('*',cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


passport.use('login', new passportStrategy((username, password, done)=>{
  let user = usuarios.find( usuario => usuario.username == username);

  if(!user) return done(null, false);

  if(user.password != password) return done(null, false);

  user.contador = 0;

  return done(null, user);
}));

passport.use('register', new passportStrategy({
  passReqToCallback: true
},(req, username, password, done)=>{
  let { direccion } = req.body;

  let userfind = usuarios.find( usuario => usuario.username == username);

  if(userfind) return done("Already registered!");

  let user = {
      username,
      password,
      direccion
  }
  usuarios.push(user);

  return done(null, user);

}));

passport.serializeUser((user, done)=>{
  done(null, user.username);
})

passport.deserializeUser((username, done)=>{
  let user = usuarios.find( usuario => usuario.username == username);
      done(null, user);
})

app.use(expressSession({
  secret: "secret123",
  cookie:{
      httpOnly: false,
      secure: false,
      maxAge: 60000
  },
  resave:false,
  saveUninitialized:false
}))


app.use(passport.initialize());
app.use(passport.session());

let isAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
     return next();
  }
  res.redirect('/login');
}

let isNotAuth = (req, res, next) =>{
  if(!req.isAuthenticated()){
      next();  
  }else{        
      res.redirect('/datos');
  }
}

//Routes
app.get('/registro', isNotAuth, (req, res, next) => {
  res.render('registro');
})

app.post('/registro', passport.authenticate('register', { failureRedirect: 'registro-error', successRedirect: 'datos' }));

app.get('/', (req, res, next) => {
  let routes = { login: 'login', datos: '/datos' };
  let path_to = '';
  req.isAuthenticated() ? path_to = routes.datos : path_to = routes.login;
  res.redirect(path_to);
})

app.get('/login', (req, res, next) => {
  res.render('login');
})

app.post('/login', passport.authenticate('login', { failureRedirect: 'login-error', successRedirect: 'datos' }));


app.get('/datos', isAuth, (req, res, next) => {
  if (!req.user.contador) {
      req.user.contador = 1
  } else {
      req.user.contador++;
  }
  res.render('datos', {
      data: controller.getProductos(),
      contador: req.user.contador,
      usuario: req.user
  });
})

app.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
      if (err) res.send(JSON.stringify(err));
      res.render('logout', {
          usuario: req.user
      });
  })
})
app.get('/login-error', (req, res, next) => {
  res.render('login-error');
});


app.use("/productos", productoRouter)
app.use("/users",usersRouter);



//Socket
io.on('connection', async socket=>{
  socket.on('getProductos',async()=>{
    io.socket.emit('lista', await controller.getProductos)
  })
  socket.on('productoNuevo', ()=>{
    io.socket.emit('lista' , controller.getProductos())
  })
})

httpServer.listen(PORT,()=>{
     console.log(`http://localhost:${PORT}`)
})
