import { Router } from "express";
import UserDAO from "../dao/UserDAO.js";
import { hashPassword, comparePassword} from "../dao/utils/encrypt.utils.js";
import passport from "passport";


const userRouter = Router();

userRouter.post("/", async (req, res) => {
    const userData = {
        ...req.body,
        password: hashPassword(req.body.password)
    };
    // console.log(userData)
    try {
        const newUser = await UserDAO.createUser(userData);
        // delete newUser.password
        // res.status(201).json(newUser);
        res.redirect('/');
    } catch (err) {
        res.redirect('/register');
        //res.status(400).json({ error: err })
    }
})

userRouter.post(
	'/',
	passport.authenticate('register', { failureRedirect: '/registererror' }),
	async (req, res) => {
		res.redirect('/products');
	}
);

// userRouter.post(
//     "/auth",
//     passport.authenticate("register"), { failRedirect: '/registerError' },
//     async (req, res) => {
//         const { email, password } = req.body;
//         try {
//             if (email === "adminCoder@coder.com" && password === "1234") {
//                 const user = {
//                     first_name: "Coder",
//                     last_name: "House",
//                     email: email,
//                     password: password,
//                     img: "https://pbs.twimg.com/profile_images/1465705281279590405/1yiTdkKj_400x400.png",
//                     rol: "admin",
//                 };
//                 req.session.user = user;
//                 res.redirect('/products');
//             } else {
//                 const user = await UserDAO.getUserByEmail(email);
//                 if (!user) throw new Error("Usuario no encontrado");
//                 if (!comparePassword(user, password)) throw new Error("Contraseña incorrecta");
//                 req.session.user = user;
//                 res.redirect('/products');
//             }
//         } catch (err) {
//             res.redirect('/login');
//             // res.status(400).json({ error: err.message })
//         }
//     })
// userRouter.post("/auth", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         if (email === "adminCoder@coder.com" && password === "1234") {
//             const user = {
//                 first_name: "Coder",
//                 last_name: "House",
//                 email: email,
//                 password: password,
//                 img: "https://pbs.twimg.com/profile_images/1465705281279590405/1yiTdkKj_400x400.png",
//                 rol: "admin",
//             };
//             req.session.user = user;
//             res.redirect('/products');
//         } else {
//             const user = await UserDAO.getUserByEmail(email);
//             if (!user) throw new Error("Usuario no encontrado");
//             if (!comparePassword(user, password)) throw new Error("Contraseña incorrecta");
//             req.session.user = user;
//             res.redirect('/products');
//         }
//     } catch (err) {
//         res.redirect('/login');
//         // res.status(400).json({ error: err.message })
//     }
// })

userRouter.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

export default userRouter;