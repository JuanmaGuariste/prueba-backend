import passport from 'passport';
import local from 'passport-local';
import userDAO from '../UserDAO.js';
import { hashPassword, comparePassword } from '../utils/encrypt.utils.js';

const LocalStrategy = local.Strategy;

const inicializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy({
            usernameField: 'email', 
            passReqToCallback: true
        }, async (req, username, password, done) => {
            const { first_name, last_name, img } = req.body;

            try{
                const user = await userDAO.getUserByEmail(username);
                if(user){
                    return done(null, false, { message: 'El usuario ya existe' });
                }
                const hashedPassword = await hashPassword(password);
                const newUser = await userDAO.createUser({ 
                    first_name,
                    last_name,
                    email: username,
                    password: hashedPassword,
                    img,                  
                });
                return done(null, newUser);


            }catch(err){
                return done(err);
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {        
        const user = await userDAO.getUserById(id);

        if (user.email === "adminCoder@coder.com"){
            user.rol = "admin";
        } else {
            user.rol = "user";
        }
        done(null, user);
    });

    passport.use("login", new LocalStrategy({usernameField: "email"}, async (username, password, done) => {
        try{
            const user = await userDAO.getUserByEmail(username);
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            } 
            if (!comparePassword(user, password)) {
                return done(null, false, { message: 'Dato incorrecto' });
            }
            return done(null, user);
        } catch(err){
            return done(err);
        }
    }))

}

export default inicializePassport;