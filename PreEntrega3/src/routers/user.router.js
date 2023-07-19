import { Router } from "express";
import { hashPassword, comparePassword } from "../utils/encrypt.utils.js";
import passport from "passport";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import usersController from "../controllers/users.controller.js";

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
	async (req, res) => { }
);

userRouter.get(
	'/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	(req, res) => {
		req.session.user = req.user;
		let user = req.session.user
		console.log("Req session: ", req.session.user)
		const token = jwt.sign({ user }, 'privateKey', { expiresIn: '1h' });
		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 6000000,
		}).redirect('/products');
		
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

userRouter.post('/logout', (req, res) => {
	res.clearCookie('token');
	res.redirect('/login');
});


/* userRouter.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userController.getUserByEmail(email);
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

	let user = {};
	try {
		if (email === "adminCoder@coder.com" && password === "1234") {
			user = {
				first_name: "Coder",
				last_name: "House",
				email: email,
				age: 26,
				password: password,
				img: "https://pbs.twimg.com/profile_images/1465705281279590405/1yiTdkKj_400x400.png",
				rol: "admin",
				cart: [],
				_id: "coder",
			};
		} else {
			user = await usersController.getUserByEmail(email);
			if (!user) {
				//return res.redirect('/404');
				return res.redirect('/registerError');
			}
			if (!bcrypt.compareSync(password, user.password)) {
				//return res.redirect('/404');
				return res.redirect('/registerError');
			}
		}
		const token = jwt.sign({ user }, 'privateKey', { expiresIn: '1h' });
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