import jwt from "jsonwebtoken";

const privateKey = "privateKey";

const generateToken = (user) => {
    return jwt.sign(user, privateKey, { expiresIn: "1h" });
};

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(401).send({message: "Token not found"});
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, privateKey, (err, credentials) => {
        if (err){
            res.status(401).send({message: "Token invalid"});
        }
        req.user = credentials.user;
        next();
    })
}

export {generateToken, authToken};