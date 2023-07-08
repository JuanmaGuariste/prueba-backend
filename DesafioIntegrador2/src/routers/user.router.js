import { Router } from "express";
import userDAO from "../dao/mongo/UserDAO.js";
import { hashPassword, comparePassword } from "../utils/encrypt.utils.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.post(
    '/',
    passport.authenticate('register', { failureRedirect: '/registerError' }),
    async (req, res) => {
        res.redirect('/products');
    }
);

userRouter.get(
	'/github',
	passport.authenticate('github', { scope: ['user:email'] }),
	async (req, res) => {}
);

userRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		req.session.user = req.user;
		res.redirect('/products');
	}
);

/* userRouter.post(
    "/auth",
    passport.authenticate("login", { failureRedirect: '/loginError' }),
    async (req, res) => {
        if (!req.user) return res.status(400).send("Usuario no encontrado")
        const user = req.user;
        delete user.password;
        req.session.user = user;
        res.redirect('/products');
    }) */

userRouter.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

/* userRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userDAO.getUserByEmail(email);
		if (!user) {
			return res.redirect('/404');
		}

		if (!bcrypt.compareSync(password, user.password)) {
			return res.redirect('/404');
		}
		console.log(user)
		const token = jwt.sign({ user }, 'privatekey', { expiresIn: '1h' });
		console.log(token)

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 6000000,
		}).redirect('/products');
	} catch (err) {
		console.log(err);
		res.redirect('/error');
	}
}); */

userRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;
		try {			
			const user = await userDAO.getUserByEmail(email);
			if (!user) {
				//return res.redirect('/404');
				return res.redirect('/registerError');
			}
	
			if (!bcrypt.compareSync(password, user.password)) {
				//return res.redirect('/404');
				return res.redirect('/registerError');
			}
	
			const token = jwt.sign({ user }, 'privateKey', { expiresIn: '1h' });
			console.log(user)
			console.log(token)
			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 6000000,
			}).redirect('/products');
		} catch (err) {
			res.redirect('/registerError');
		}
    }
);


export default userRouter;