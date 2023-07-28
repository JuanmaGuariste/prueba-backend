import ChatsService from '../services/chats.service.js';
import chatMongoDAO from '../dao/mongo/ChatMongo.dao.js';

class ChatsController {
	constructor() {
		this.service = new ChatsService(chatMongoDAO);
	}
    
	getAllMessages() {
        return this.service.getAllMessages();
    }

    addMessage(chat) {
        return this.service.addMessage(chat);
    }	
}

const chatsController = new ChatsController();

export default chatsController;