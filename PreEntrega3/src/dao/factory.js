import enviroment from '../config/enviroment.js';
import mongoose from 'mongoose';
export let Products;
export let Carts;
export let Users;
export let Chats;


switch(enviroment.PERSISTENCE){
    case "MONGO":
        const connection = mongoose.connect(enviroment.MONGO_URL);
        
        const {default:ProductMongoDAO} = await import ("./mongo/productMongo.dao.js");
        Products = ProductMongoDAO
        const {default:CartMongoDAO} = await import ("./mongo/cartMongo.dao.js");
        Carts = CartMongoDAO
        const {default:UserMongoDAO} = await import ("./mongo/userMongo.dao.js");
        Users = UserMongoDAO
        const {default:ChatMongoDAO} = await import ("./mongo/chatMongo.dao.js");
        Chats = ChatMongoDAO
        break;
    case "FILE":
        const {default:ProductFileDAO} = await import ("./filesystem/productFile.dao.js");
        Products = ProductFileDAO
       // const productController = new ProductController("./products.json");
        const {default:CartFileDAO} = await import ("./filesystem/cartFile.dao.js");
        Carts = CartFileDAO
        const {default:UserFileDAO} = await import ("./filesystem/userFile.dao.js");
        Users = UserFileDAO
        const {default:ChatFileDAO} = await import ("./filesystem/chatFile.dao.js");
        Chats = ChatFileDAO
        break;
}