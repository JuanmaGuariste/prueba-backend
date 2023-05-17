import express from 'express';
import handlerbars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/', viewsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const webServer = app.listen(8080, () => {
	console.log('Escuchando 8080');
});

const io = new Server(webServer);

io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado!');	
	// socket.on('new-message', (message) => {
	// 	console.log(message);
	// 	// Agrego el mensaje al array de mensajes
	// 	messages.push(message);
	// 	// Propago el evento a todos los clientes conectados
	// 	io.emit('messages', messages);
	// });
});