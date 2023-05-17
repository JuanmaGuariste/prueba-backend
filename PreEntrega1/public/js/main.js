const socket = io();

function sendProduct() {
	// Obtengo el mensaje del input
    //console.log("Estoy en send product")
	const product = {}
	
	product.title = document.getElementById('title').value;
	product.description = document.getElementById('description').value;
	product.category = document.getElementById('category').value;
	product.price = document.getElementById('price').value;
	product.thumbnail = document.getElementById('thumbnail').value;
	product.code = document.getElementById('code').value;
	product.stock = document.getElementById('stock').value;
	product.status = document.getElementById('status').value;
	// Envío el mensaje al servidor	
	socket.emit('new-product', product);

}
function deleteProduct() {
	// Obtengo el mensaje del input
    console.log("Estoy en delete product")
	const prodId = document.getElementById('id').value;

	// Envío el mensaje al servidor	
	socket.emit('delete-product', prodId);
	
}


// function render(data) {
// 	// Genero el html
// 	const html = data
// 		.map((elem, index) => {
// 			// Recorro el array de mensajes y genero el html
// 			return `<div>
//                 <em>${elem}</em>
//             </div>`;
// 		})
// 		.join(' '); // Convierto el array de strings en un string
//         console.log("Hola")
// 	// Inserto el html en el elemento con id messages
// 	document.getElementById('messages').innerHTML = html;
// }

// Escucho el evento messages y renderizo los mensajes
socket.on('totalProducts', (data) => {
	// render(data);
	const html = data
		.map((elem, index) => {
			// Recorro el array de mensajes y genero el html
			return `<div>
				<h2>Producto </h2>
                <p>ID: ${elem.id}</p>
                <p>Título: ${elem.title}</p>
                <p>Descripción: ${elem.description}</p>
                <p>Categoría: ${elem.category}</p>
                <p>Precio: ${elem.price}</p>
                <p>Thumbnail: ${elem.thumbnail}</p>
                <p>Código: ${elem.code}</p>
                <p>Stock: ${elem.stock}</p>
                <p>Estado: ${elem.status}</p>
            </div>`;
		})
    document.getElementById('totalProducts').innerHTML = html;
});