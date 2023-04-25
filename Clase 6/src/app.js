import express from "express";

const app = express()

app.use(express.urlencoded({ extended: true }));

const users = [
    {
        id: "1",
        name: 'Sofía',
        lastname: 'Perez',
        age: 20,
        email: 'juan.perez@gmail.com',
        genero: 'F'
    },
    {
        id: "2",
        name: 'Julian',
        lastname: 'Santos',
        age: 30,
        email: 'julian.santos@gmail.com',
        genero: 'M'
    },
    {
        id: "3",
        name: 'Maxi',
        lastname: 'Rodriguez',
        age: 60,
        email: 'jmaxi.rofriguez@gmail.com',
        genero: 'M'
    },
];



app.get("/bienvenida", (req, res) => {
    res.send('<p style="color: blue;">Bienvenido </p>')

})
// app.get("/usuario", (req, res) => {
//     console.log(req)
//     const user = {
//         name: 'Juan',
//         lastname: 'Perez',
//         age: 30,
//         email: 'juanperez@gmail.com',
//     }
//     res.send(user)

// })
app.get("/saludar/:nombre", (req, res) => {
    res.send(`hola ${req.params.nombre}`);
})
app.get("/users", (req, res) => {
    let genero = req.query.genero;
    if (!genero || (genero != 'F' && genero != 'M')) {
        res.send(users)
    } else {
        res.send(users.filter((user) => user.genero === genero))
    }
  
})
app.get("/user/:id", (req, res) => {
    let user = users.filter((user) => {
        return user.id === req.params.id
    })[0]
    res.send(user);
})

app.listen(8080, () => {
    console.log("Estoy escuchando el 8080")
})