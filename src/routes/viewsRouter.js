import express from "express"
const viewsRouter = express.Router();
import {ProductsMongo} from "../../managers/ProductsMongo.js"
import {CartsMongo} from "../../managers/CartsMongo.js"
const cartManager = new CartsMongo;
const productManager = new ProductsMongo;


viewsRouter.get("/", async(req, res, next) => {
    const [status, message, productos] = await productManager.getAll();
    switch(status) {
        case '200': 
            res.render('index', {productos});
            return;
        case '404':
            res.status(404).send({
                message:message
            });
    }
})

viewsRouter.get("/realtimeproducts", async(req, res, next) => {
    // const limit = req.query.limit? +req.query.limit : 0;
    const [status, message, productos] = await productManager.getAll();
    console.log(productos)
    switch(status) {
        case '200': 
            res.render('realTimeProducts', {productos});
            return;
        case '404':
            res.status(404).send({
                message:message
            });
    }
})

viewsRouter.get("/products", async(req, res, next) => {
    const limit = req.query.limit? +req.query.limit : 3;
    const page = req.query.page? +req.query.page : 1;
    const sort = req.query.sort? +req.query.sort : 0;
    const query = {}
    const [status, message, productos] = await productManager.getAllPaginated(limit, page, sort, query);
    console.log(productos)
    switch(status) {
        case '200': 
            res.render('home', {products: productos.docs, page: productos.page, prev: productos.prevPage, next: productos.nextPage, limit: limit, sort:sort, query: query});
            return;
        case '404':
            res.status(404).send({
                message:message
            });
    }
});

viewsRouter.get("/products/:id", async(req, res, next) => {
    const {id} = req.params;
    const [status, message, product] = await productManager.getById(id);
    console.log(product)
    if(product){
        res.render('singleProduct', {product})
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})

viewsRouter.get("/carts/:id", async(req, res, next) => {
    const {id} = req.params;
    const [status, message, products] = await cartManager.getById(id);
    console.log(products)
    if(products){
        res.render('cart', {id: products._id, products: products.products})
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }

})
export default viewsRouter;