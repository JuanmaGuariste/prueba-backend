import UserDTO from "../dto/users.dto.js";

export default class ProductsService {
	constructor(dao) {
		this.dao = dao;
	}

	getAllUsers() {
		return this.dao.getAllUsers();
	}

	createUser(user) {
		return this.dao.createUser(user);
	}
	
    async getUserById(id) {
		if (id === "coder"){						
			return null
		}else {
			let user =  await this.dao.getUserById(id);			
			return new UserDTO(user)
		}		 
	}

	getUserByEmail(email) {		
		return this.dao.getUserByEmail(email);
	}
}

