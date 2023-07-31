import fs from 'fs';

class UserFileDAO {
    #id = 0;
    constructor() {
        this.path = './users.json';
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        } else {
            const actualUSer = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if (actualUSer.length > 0) {
                const lastUserId = Math.max(...actualUSer.map(usr => usr.id));
                this.#id = lastUserId;
            }
        }
    }

    async getAllUsers() {
        try {
            const users = await fs.promises.readFile(
                this.path,
                'utf-8'
            );
            return JSON.parse(users);
        } catch (err) {
            return [];
        }
    }

    async getUserByEmail(email) {
        try {
            const users = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));
            return users.find((user) => user.email === email);
        } catch (err) {
            return null;
        }
    }

    async createUser(user) {
        try {
            const users = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));            
            users.push(user);
           // fs.writeFileSync(this.filename, JSON.stringify(users, null, 2));
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(users)
            );
            console.log("user: ", user)
            return user;
        } catch (err) {
            throw new Error('Error al crear el usuario');
        }
    }

    async getUserById(id) {
        try {
            const users = JSON.parse(await fs.promises.readFile(
                this.path,
                'utf-8'
            ));
            return users.find((user) => user._id === id);
        } catch (err) {
            return null;
        }
    }
    // #getID() {
    //     this.#id++;
    //     return this.#id;
    // }
}

const userFileDAO = new UserFileDAO();

export default userFileDAO;
