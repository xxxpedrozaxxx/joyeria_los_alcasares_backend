

import dotenv from 'dotenv';
import express, { Application } from 'express';
import { AppDataSource } from './config/data-source';
import { ProductoRouter } from './api/routes/producto.routes';
dotenv.config();

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import cors from 'cors';

export const app: Application = express();
const port = process.env.SERVER_PORT || 3000;

export const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Fuente de datos inicializada correctamente.");
    app.use(cors()); // Habilita CORS
    app.use(express.json()); // Permite leer req.body en JSON
    // Documentación OpenAPI
    
    const { ContactoRouter } = require('./api/routes/contacto.routes');
    app.use('/api/contacto', ContactoRouter);
  // ...existing code...
    // Rutas principales
    const { NewslatterRouter } = require('./api/routes/newslatter.routes');
    app.use('/api/newslatter', NewslatterRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Rutas principales
    app.use('/api/productos', ProductoRouter);
    const { UsuarioRouter } = require('./api/routes/usuario.routes');
    app.use('/api/usuarios', UsuarioRouter);
    const { ResenaRouter } = require('./api/routes/resena.routes');
    app.use('/api/resenas', ResenaRouter);
    const { ProveedorRouter } = require('./api/routes/proveedor.routes');
    app.use('/api/proveedores', ProveedorRouter);
    const { MaterialRouter } = require('./api/routes/material.routes');
    app.use('/api/materiales', MaterialRouter);
    const { CategoriaRouter } = require('./api/routes/categoria.routes');
    app.use('/api/categorias', CategoriaRouter);
    const { DepartamentoRouter } = require('./api/routes/departamento.routes');
    app.use('/api/departamentos', DepartamentoRouter);
    const { MunicipioRouter } = require('./api/routes/municipio.routes');
    app.use('/api/municipios', MunicipioRouter);
    const { DireccionRouter } = require('./api/routes/direccion.routes');
    app.use('/api/direcciones', DireccionRouter);
    const { CarritoRouter } = require('./api/routes/carrito.routes');
    app.use('/api/carritos', CarritoRouter);
    const { ItemCarritoRouter } = require('./api/routes/item-carrito.routes');
    app.use('/api/items-carrito', ItemCarritoRouter);
    const { DetallePedidoRouter } = require('./api/routes/detalle-pedido.routes');
    app.use('/api/detalles-pedido', DetallePedidoRouter);
    const { PedidoRouter } = require('./api/routes/pedido.routes');
    app.use('/api/pedidos', PedidoRouter);
    const { ProductoMaterialRouter } = require('./api/routes/producto-material.routes');
    app.use('/api/producto-materiales', ProductoMaterialRouter);
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error durante la inicialización de la fuente de datos:", error);
    process.exit(1); // Salir si la base de datos no se puede conectar
  }
};