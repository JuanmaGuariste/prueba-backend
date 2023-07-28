import UsersService from '../services/users.service.js';
import userMongoDAO from '../dao/mongo/UserMongo.dao.js';

class UsersController {
	constructor() {
		this.service = new UsersService(userMongoDAO);
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