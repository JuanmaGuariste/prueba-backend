import fs from 'fs';


class ChatFileDAO {
    #id = 0;
    constructor() {
        this.path = './chats.json';
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const actualChats = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if (actualChats.length > 0) {
                const lastChatId = Math.max(...actualChats.map(chat => chat.id));
                this.#id = lastChatId;
            }
        }
    }

    async getAllMessages() {
        try {
            const messages = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            return JSON.parse(messages);
        } catch (err) {
            return [];
        }
    }

    async addMessage(chat) {
        try {
            const messages = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            messages.push(chat);
            fs.writeFileSync(this.filename, JSON.stringify(messages, null, 2));
            return chat;
        } catch (err) {
            throw new Error('Error al agregar el mensaje al chat');
        }
    }
}

const chatFileDAO = new ChatFileDAO();

export default chatFileDAO;
