const express = require('express');
const cors = require('cors');
const Producto = require('./Models/Producto');
const Ventas = require('./Models/Venta');

const app = express();

// Habilitar CORS
app.use(cors()); // instale npm install cors y lo coloque ahi para que cargue los datos al front


app.use(express.json());

// Ruta GET ver para productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
});


// Ruta POST para agregar un nuevo producto
app.post('/productos', async (req, res) => {
    try {
        const { NombreProducto, PrecioProducto, IsvProducto, imagenProducto } = req.body;

        if (!NombreProducto || !PrecioProducto || !IsvProducto || !imagenProducto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const nuevoProducto = await Producto.create({
            NombreProducto,
            PrecioProducto,
            IsvProducto,
            imagenProducto
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        // Si ocurre un error
        res.status(500).json({ error: 'Ocurrio un error al agregar el producto: ' + error.message });
    }
});


















// Ruta POST para ventas
app.post('/ventas', async (req, res) => {
    try {
        console.log(req.body);
        const ventas = await Ventas.create(req.body);
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error' + error });
    }
});

app.listen(5002, () => {
    console.log('Aplicación ejecutándose en el puerto 5002');
});
