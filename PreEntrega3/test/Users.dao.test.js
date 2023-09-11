import Assert from 'assert';
import userDAO from '../src/dao/mongo/UserDAO.js';
import mongoose from 'mongoose';
import environment from '../src/config/environment.js';
import chai from 'chai';

await mongoose.connect(environment.MONGO_URL);
const userDao = userDAO;
const expect = chai.expect;

describe('UserDAO - MongoDB', async () => {
    before(async function () {
        await mongoose.connection.collection('users').drop()
    })
    beforeEach(function () {
        this.timeout(10000);
    });


    it('El DAO debe agregar un usuario correctamente a la base de datos de MongoDB', async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan1.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }
        const result = await userDAO.createUser(mockUser)
        Assert.ok(result._id);
        // .then(result => {
        //     Assert.ok(result._id);
        //     done();
        // })
    });
    it("El DAO debe agregar un array vacio por defecto al carrito del usuario", async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan2.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }
        const result = await userDAO.createUser(mockUser)
        Assert.deepStrictEqual(result.cart, []);

        //   .then(result => { 
        //     Assert.deepStrictEqual(result.cart, []);
        //     // expect(result.cart).to.deep.equal([]);
        //     done()
        //   })
    });

    it("El DAO debe poder obtener el usuario por email", async () => {
        const mockUser = {
            first_name: 'Juan',
            last_name: 'Perez',
            email: 'juan3.perez@mail.com',
            age: 20,
            password: '1234',
            img: '',
            rol: 'user',
            cart: []
        }

        await userDAO.createUser(mockUser)

        const user = await userDao.getUserByEmail( "juan3.perez@mail.com" )

        Assert.ok(user._id);

        // expect(user._id).to.be.ok;
         expect(user.email).to.be.equal("juan3.perez@mail.com");
         expect(user).to.have.property("email");

    })


    afterEach(async function () {
        await mongoose.connection.collection('users').drop()
        // await mongoose.connection.db.getCollection('collection').drop()
        // mongoose.connection.db.dropCollection("users");
        // await mongoose.connection.collections.users.drop();              

    })
})
