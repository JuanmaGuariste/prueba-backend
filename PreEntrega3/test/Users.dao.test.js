import Assert from 'assert';
import userDAO from '../src/dao/mongo/UserDAO.js';
import mongoose from 'mongoose';
import environment from '../src/config/environment.js';


mongoose.connect(environment.MONGO_URL);
const userDao =  userDAO;

describe('UserDAO - MongoDB', () => {    
    beforeEach(function () { // Utiliza una función normal en lugar de función de flecha
        this.timeout(5000);
    })

    it('El DAO debe agregar un usuario correctamente a la base de datos de MongoDB', async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }
        userDAO.createUser(mockUser)
        .then(result => {
            Assert.ok(result._id);
            done();
        })
    });      
})
