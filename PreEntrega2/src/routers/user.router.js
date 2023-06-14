import { Router } from "express";
import UserDAO from "../dao/UserDAO.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await UserDAO.createUser(userData);
        res.redirect('/');
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

userRouter.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserDAO.getUserByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");
        if (user.password !== password) throw new Error("Contraseña incorrecta");
        req.session.user = user;
        res.redirect('/products');
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

userRouter.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

export default userRouter;
