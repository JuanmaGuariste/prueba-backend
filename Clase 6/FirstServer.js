const  http = require('http');

const server = http.createServer((req, res) => {
    res.end("Mi primer hola mundo desde un backend!");
})

server.listen(8080, () => {
    console.log("Escuchando puerto 8080")
})