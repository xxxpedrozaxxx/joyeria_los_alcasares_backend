import { Contacto } from "../entities/contacto.entity";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { Usuario } from "../entities/usuario.entity";
import { Carrito } from "../entities/carrito.entity";
import { Categoria } from "../entities/categoria.entity";
import { Departamento } from "../entities/departamento.entity";
import { DetallePedido } from "../entities/detalle-pedido.entity";
import { Direccion } from "../entities/direccion.entity";
import { Material } from "../entities/material.entity";
import { Municipio } from "../entities/municipio.entity";
import { Pedido } from "../entities/pedido.entity";
import { ProductoMaterial } from "../entities/producto-material.entity";
import { Producto } from "../entities/producto.entity";
import { Proveedor } from "../entities/proveedor.entity";
import { Resena } from "../entities/resena.entity";
import { ItemCarrito } from "../entities/item-carrito.entity";
import { Newslatter } from "../entities/newslatter.entity";

// Carga las variables de entorno desde el archivo .env
config();

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Cambiar a false en producción
    logging: false, // Cambiar a false en producción
    entities: [
        // --- Y luego listarlas todas aquí ---
        Carrito,
        Categoria,
        Departamento,
        DetallePedido,
        Direccion,
        ItemCarrito,
        Material,
        Municipio,
        Pedido,
        ProductoMaterial,
        Producto,
        Proveedor,
        Resena,
        Usuario,
        Newslatter,
        Contacto,
    ],
    migrations: [],
    subscribers: [],
};  

// Se crea la instancia del DataSource que se usará en toda la aplicación
export const AppDataSource = new DataSource(dataSourceOptions);