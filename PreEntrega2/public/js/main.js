const socket = io();


async function createCart() {

	return await fetch('http://localhost:8080/api/carts',
		{
			method: 'POST'
		})
		.then(response => response.json())
		.then(cart => {
			// Aquí puedes realizar las acciones que desees con el carrito devuelto
			return cart.payload._id;
		})
		.catch(error => {
			console.error('Error al crear el carrito:', error);
		});
}

// function createCart() {
// 	return fetch('http://localhost:8080/api/carts', {
// 	  method: 'POST'
// 	})
// 	  .then(response => response.json())
// 	  .then(cart => {
// 		localStorage.setItem('carrito', JSON.stringify(cart.payload._id));
// 		return cart.payload._id;
// 	  })
// 	  .catch(error => {
// 		console.error('Error al crear el carrito:', error);
// 	  });
//   }
  
async function addProductToCart(pid) {
	let cid = JSON.parse(localStorage.getItem('carrito'));
	if (!cid) {
	  cid = await createCart();
	  localStorage.setItem('carrito', JSON.stringify(cid));
	}
  
	console.log(cid);
	const response = await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
	  method: 'POST'
	});
  
	if (response.ok) {
	  Swal.fire({
		title: 'Producto agregado',
		icon: 'success'
	  });
	} else {
	  Swal.fire({
		title: 'Error al agregar el producto',
		text: 'Hubo un problema al agregar el producto al carrito',
		icon: 'error'
	  });
	}
  }
  

// const addProductToCart = async (pid) => {
// 	let cid = JSON.parse(localStorage.getItem('carrito'));
// 	if (!cid) {
// 	  cid = await createCart();
// 	  localStorage.setItem('carrito', JSON.stringify(cid));
// 	}
  
// 	console.log(cid);
// 	try {
// 	  const response = await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
// 		method: "POST",
// 	  });
  
// 	  if (response.ok) {
// 		Swal.fire({
// 		  title: 'Producto agregado',
// 		  icon: 'success',
// 		});
// 	  } else {
// 		Swal.fire({
// 		  title: 'Error al agregar el producto',
// 		  text: 'Ocurrió un problema al intentar agregar el producto al carrito',
// 		  icon: 'error',
// 		});
// 	  }
// 	} catch (error) {
// 	  console.error('Error al agregar el producto al carrito:', error);
// 	}
//   };
  
// const addProductToCart = async (pid) => {
// 	let cid = JSON.parse(localStorage.getItem('carrito'));
// 	if (!cid) {
// 	  cid = await createCart();
// 	  localStorage.setItem('carrito', JSON.stringify(cid));
// 	}
  
// 	console.log(cid);
  
// 	await fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`, {
// 	  method: "POST",
// 	});
  
// 	Swal.fire({
// 	  title: 'Producto agregado',
// 	  icon: 'success',
// 	});
//   }
  

// function addProductToCart(pid) {
// 	 let cid = JSON.parse(localStorage.getItem('carrito')) || createCart();
	
// 	 	console.log(cid)
// 		fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`,
// 		{
// 			method: "POST",
// 		}
// 	)
// 	Swal.fire({
// 		title: 'Producto agregado',
// 		// text: 'Ingresa tu nombre de usuario',
// 		icon: 'success',

// 	})
// }


function deleteProductFromCart(pid) {
	const cid = "64876465670960e415bfbaf5";
	fetch(`http://localhost:8080/api/carts/${cid}/product/${pid}`,
		{
			method: "DELETE",
		}
			.then(
				Swal.fire({
					title: 'Producto quitado del carrito',
					// text: 'Ingresa tu nombre de usuario',
					icon: 'warning',

				})
			)
	);
}

// const response = await fetch(
// 	`http://localhost:8080/api/carts/${cart.id}`,
// 	{
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ product: prodid, quantity: qty }),
// 	}
// );

function sendProduct() {
	const product = {}
	product.title = document.getElementById('title').value;
	product.description = document.getElementById('description').value;
	product.category = document.getElementById('category').value;
	product.price = document.getElementById('price').value;
	product.thumbnail = document.getElementById('thumbnail').value;
	product.code = document.getElementById('code').value;
	product.stock = document.getElementById('stock').value;
	product.status = document.getElementById('status').value;
	socket.emit('new-product', product);
}

function deleteProduct() {
	const prodId = document.getElementById('id').value;
	socket.emit('delete-product', prodId);
}


function addProductToCart_BTN() {



	// const createCart = async () => {
	// 	const response = await fetch(`http://localhost:8080/api/carts`, {
	// 		method: "POST",
	// 	});
	// 	const cart = await response.json();
	// 	return json
	// }

	// const response = await fetch(
	// 	`http://localhost:8080/api/carts/${cart.id}`,
	// 	{
	// 		method: "PUT",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ product: prodid, quantity: qty }),
	// 	}
	// );
}

socket.on('totalProducts', (data) => {
	const html = data.map((elem, index) => {
		return `<div class="product-container">
		<h2>Producto</h2>
		<p>ID: ${elem._id}</p>
		<p>Título: ${elem.title}</p>
		<p>Descripción: ${elem.description}</p>
		<p>Categoría: ${elem.category}</p>
		<p>Precio: ${elem.price}</p>
		<p>Thumbnail: ${elem.thumbnail}</p>
		<p>Código: ${elem.code}</p>
		<p>Stock: ${elem.stock}</p>
		<p>Estado: ${elem.status}</p>
	</div>`;
	});
	document.getElementById('totalProducts').innerHTML = html.join('');
});