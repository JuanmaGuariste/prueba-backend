class TicketManager {
    #precioBaseGanancia = 0.15
    #id = 0
    constructor() {
        this.eventos = [];
    }

    getEventos() {
        return this.eventos;
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const evento = {
            nombre,
            lugar, 
            precio: precio + precio * this.#precioBaseGanancia, 
            capacidad, 
            fecha, 
            participantes: [],
        };

        evento.id = this.#getID();

        this.eventos.push(evento);
    }

    #getID() {
        const oldID = this.#id;
        this.#id += 1;
        return oldID;
    }

    agregarUsuario(idEvento, idUsuario) {
        const eventoIndex = this.eventos.findIndex(
            (evento) => evento.id === idEvento
        );
        if(eventoIndex === -1) {
            console.log("No existe el evento")
            return;
        }
        const evento = this.eventos[eventoIndex];
        if (evento.participantes.includes(idUsuario)) {
            console.log("El usuario ya está agregado")
        }
        evento.participantes.push(idUsuario)
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const eventoIndex = this.eventos.findIndex(
            (evento) => evento.id === idEvento
        );
        if(eventoIndex === -1) {
            console.log("No existe el evento")
            return;
        }
        const evento = this.eventos[eventoIndex];
        const newEvento = {
            ...evento,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            id: this.#getID(),
            participantes: [],
        }
        this.eventos.push(newEvento);
    }
}

const tm = new TicketManager()

tm.agregarEvento("evento coder 1", "Portugal", 200, 50);
tm.agregarUsuario(0, 1);
tm.ponerEventoEnGira(0, "mexico", new Date());

console.log(tm.getEventos());