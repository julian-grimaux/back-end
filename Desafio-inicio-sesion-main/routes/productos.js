let express= require("express")
const Prod = require("../controller/ProdcutoController");
let Controller = new Prod()

const router  = express.Router();

router.post('/productos', (req, res, next) => {
    Controller.addProducto(req.body);
    res.redirect('/datos');
})
module.exports=router;