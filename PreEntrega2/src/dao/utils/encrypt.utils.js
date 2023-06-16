import bcrypt from "bcrypt";

export const hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//    return bcrypt.hashSync(password, 10);
}

export const comparePassword = (user, pass) => {
    return bcrypt.compareSync(pass, user.password);
}