import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';
import { middlewarePassportJWT } from '../middleware/jwt.middleware.js';
import { isUser, isAdmin } from '../middleware/auth.middleware.js';
import productsController from '../controllers/products.controller.js';
import usersController from '../controllers/users.controller.js';
import environment from '../config/environment.js';
import Swal from 'sweetalert2';

const viewsRouter = Router();

viewsRouter.get('/products', middlewarePassportJWT, async (req, res) => {
    const { limit, page, category, status, sort } = req.query;
    const user = req.user;
    try {

        let products = await productsController.getProducts(limit, page, category, status, sort);
        res.render('products', {
            products,
            user,
        });
    }
    catch (err) {
        res.status(500).send({ status: "error", error: err })
    }
});

viewsRouter.get("/carts/:cid", middlewarePassportJWT, async (req, res) => {
    let id = req.params.cid.replace(/^'|'$/g, '');
    const user = req.user;
    try {
        let cart = await cartsController.getCartById(id);
        res.render('carts',
            {
                title: 'Cart',
                cart,
                user,
            });
    } catch (err) {
        res.status(500).send({ status: "error", error: err })
    }
});

viewsRouter.get('/realtimeproducts', middlewarePassportJWT, isAdmin, (req, res) => {
    const user = req.user;
    res.render('realTimeProducts', {
        user,
    });
});

viewsRouter.get('/chat', middlewarePassportJWT, async (req, res) => {
    const user = req.user;
    res.render('chat', {
        user,
    });
});

viewsRouter.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registrar nuevo usuario',
    });
});

viewsRouter.get('/registerError', (req, res) => {
    res.render('registerError', {
        title: 'Error al registrar nuevo usuario',
    });
});

viewsRouter.get('/loginError', (req, res) => {
    res.render('loginError', {
        title: 'Error al iniciar sesión',
    });
});

viewsRouter.get('/login', async (req, res) => {
    res.render('login', {
        title: 'Inicio de sesión',
    });
});

viewsRouter.get('/', middlewarePassportJWT, (req, res) => {

    if (!req.user) {
        res.render('login', {
            title: 'Inicio de sesión',
        });
    } else {
        res.redirect('/products');
    }
});

viewsRouter.get('/current', middlewarePassportJWT, async (req, res) => {
    let user = await usersController.getUserById(req.user._id);
    if (!user) {
        user = req.user;
        res.render('profile', {
            title: 'Perfil de Usuario',
            user,
        });
    } else {
        res.render('profile', {
            title: 'Perfil de Usuario',
            user,
        });
    }
});

viewsRouter.get("/restore-password/uid/:uid/token/:token", async (req, res) => {
    let userId = req.params.uid;
    let tokenHash = req.params.token;
    try {
        const jwt = await import('jsonwebtoken');
        const secretKey = environment.SECRET_KEY;       

        jwt.default.verify(tokenHash, secretKey, async (err, decoded) => {
            if (err) {
                req.logger.error(err)
                res.render('loginError', {
                    title: 'Token caducado',
                });
            }
            if (decoded) {
                let newUser = await usersController.getUserById(userId);
                res.render('restorePassword', {
                    title: 'Restablecer contraseña',
                    newUser
                });
            }
        });

    } catch (err) {
        res.status(500).send({ status: "error", error: err })
    }
})

export default viewsRouter;