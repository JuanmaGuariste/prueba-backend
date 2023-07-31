import chatModel from "../models/chat.model.js";

class ChatMongoDAO {
    constructor() {
        this.model = chatModel;
    }

    async getAllMessages() {
        return await this.model.find().lean();
    }

    async addMessage(chat) {
        return await this.model.create(chat);
    }
}

const chatMongoDAO = new ChatMongoDAO();

export default chatMongoDAO;