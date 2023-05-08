export default class FraseManager {
	/**
	 * Metodo que inicializa la clase FraseManager
	 * @param {String} frase La Frase
	 */
	constructor(frase) {
		this.arrayPalabras = frase.split(' ');
	}

	getFrase() {
		return this.arrayPalabras.join(' ');
	}

	getPalabra(index) {
		if (this.arrayPalabras.length - 1 < index) {
			throw new Error('No existe palabras en ese indice');
		}
		return this.arrayPalabras[index];
	}

	addPalabra(palabra) {
		this.arrayPalabras.push(palabra);
		return this.arrayPalabras.length - 1;
	}

	/**
	 * Este metodo moficiar el valro del indice index PERO DEBE EXISTIR
	 * @param {number} index Indicme a modificar
	 * @param {string} palabra Valor a agregar
	 */
	updatePalabra(index, palabra) {
		this.arrayPalabras[index] = palabra;
	}

	deletePalabra(index) {
		if (this.arrayPalabras.length - 1 < index) {
			throw new Error('No existe palabras en ese indice');
		}
		this.arrayPalabras.splice(index, 1);
	}
}


// export default class FraseManager {
//     /**
//      * Metodo que inicializa la clase FraseManager
//      * @param {string} frase La frase
//      */
//     constructor(frase) {
//         this.arrayPalabras = frase.split(" ");
//     }

//     getFrase() {
//         return this.arrayPalabras.join(" ");
//     }

//     getPalabra(index) {
//         if ((this.arrayPalabras.length - 1) < index) {
//             throw new Error("No existen palabras en ese índice")
//         }
//         return arrayPalabras[index];
//     }

//     addPalabra(palabra) {
//         this.arrayPalabras.push(palabra)
//         return this.arrayPalabras.length - 1;
//     }

//     updatePalabra(index, palabra) {
//         if ((this.arrayPalabras.length - 1) < index) {
//             throw new Error("No existen palabras en ese índice")
//         }
//         let anterior = this.arrayPalabras[index]
//         this.arrayPalabras[index] = palabra;
//         return { anterior, actualizada: palabra }
//     }

//     deletePalabra(index) {
//         if ((this.arrayPalabras.length - 1) < index) {
//             throw new Error("No existen palabras en ese índice");
//         }
//         this.arrayPalabras.splice(index, 0);
//     }
// }