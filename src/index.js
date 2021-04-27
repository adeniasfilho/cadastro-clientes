const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;

app.get("/clientes", (req, res) => {
    res.send(clientes);
});
app.put("/clientes", async(req, res) => { 
    contador++;
    const {
        cliente: [
            {
                nome:string,
                endereco: string,
                idade: int,
                status: string 
            }
        ]
    } = req.body;
    clientes[contador] = {
        contador,
        cliente
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            contador,
            cliente,  
        },
    });
    res.status(201).send(clientes[contador]);
});
app.listen(4000, () => {
    console.log("clientes. Porta 4000");
});