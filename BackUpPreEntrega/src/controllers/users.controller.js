import UsersService from '../services/users.service.js';
// import userMongoDAO from '../dao/mongo/userMongo.dao.js';
import {Users} from '../dao/factory.js'

let users = Users
class UsersController {
	constructor() {
		this.service = new UsersService(users);
	}
    
    getAllUsers() {
		return this.service.getAllUsers();
	}

	createUser(user) {
		return this.service.createUser(user);
	}
	
    getUserById(id) {
		return this.service.getUserById(id);
	}

	getUserByEmail(email) {		
		return this.service.getUserByEmail(email);
	}
}

const usersController = new UsersController();

export default usersController;