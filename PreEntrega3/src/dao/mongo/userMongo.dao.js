import userModel from "../models/user.model.js";

class UserMongoDAO {
    constructor() {
        this.model = userModel;
    }

    async getAllUsers() {
        return await this.model.find();
    }  
    
    async getUserByEmail(email) {
        let user = await this.model.findOne({ email: email });
        return user;
    }

    async createUser(user) {
        let newUser = await this.model.create(user);
        return newUser;
    }

    async getUserById(id) {
        return await this.model.findById(id);
    }
}

const userMongoDAO = new UserMongoDAO();

export default userMongoDAO;