export default class ChatsService {
	constructor(dao) {
		this.dao = dao;
	}

    async getAllMessages() {
        return await this.dao.getAllMessages();
    }

    async addMessage(chat) {
        return await this.dao.addMessage(chat);    
    }	
}