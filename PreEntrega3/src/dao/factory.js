export let Products;
export let Carts;
export let Users;
export let Chats;

import enviroment from './config/enviroment.js';

switch(config.persistance){
    case "MONGO":
        const connection = mongoose.connect(enviroment.MONGO_URL);
        const {default:ProductMongoDAO} = await import ("./dao/mongo/ProductMongo.dao.js");
        Products = ProductMongoDAO
        const {default:CartMongoDAO} = await import ("./dao/mongo/CartMongo.dao.js");
        Carts = CartMongoDAO
        const {default:UserMongoDAO} = await import ("./dao/mongo/UserMongo.dao.js");
        Users = UserMongoDAO
        const {default:ChatMongoDAO} = await import ("./dao/mongo/ChatMongo.dao.js");
        Chats = ChatMongoDAO
        break;
    case "FILE":
        const {default:ProductFileDAO} = await import ("./dao/filesystem/ProductFile.dao.js");
        Products = ProductFileDAO
        const {default:CartFileDAO} = await import ("./dao/filesystem/CartFile.dao.js");
        Carts = CartFileDAO
        const {default:UserFileDAO} = await import ("./dao/filesystem/UserFile.dao.js");
        Users = UserFileDAO
        const {default:ChatFileDAO} = await import ("./dao/filesystem/ChatFile.dao.js");
        Chats = ChatFileDAO
        break;
}