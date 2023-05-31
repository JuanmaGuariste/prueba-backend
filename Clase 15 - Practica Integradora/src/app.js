import express from 'express';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import studentRouter from './routers/student.router.js';

const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// app.use('/', viewsRouter);
// app.use('/realtimeproducts', viewsRouter);
app.use('/api/student', studentRouter);
// app.use('/api/carts', cartsRouter);

mongoose.connect(
    'mongodb+srv://juanmaguariste:guaripsw@cluster0.d5w82e1.mongodb.net/?retryWrites=true&w=majority'
)

const webServer = app.listen(8080, () => {
    console.log('Escuchando 8080');
});