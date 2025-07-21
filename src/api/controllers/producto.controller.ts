import { Request, Response, NextFunction } from 'express';


import { ProductoService } from '../../services/producto.service';
import { CreateProductoDto, UpdateProductoDto } from '../../dtos/productos/create-producto.dto';

export class ProductoController {
    // Instanciamos el servicio para poder usar sus métodos
    private readonly productoService = new ProductoService();

    /**
     * Controlador para obtener todos los productos.
     * Maneja la lógica de la ruta GET /
     */
    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productos = await this.productoService.findAll();
            res.status(200).json(productos);
        } catch (error) {
            next(error); // Pasa el error a nuestro manejador de errores centralizado
        }
    };

    /**
     * Controlador para obtener un producto por su ID.
     * Maneja la lógica de la ruta GET /:id
     */
    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const producto = await this.productoService.findById(id);
            res.status(200).json(producto);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Controlador para crear un nuevo producto.
     * Maneja la lógica de la ruta POST /
     */
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productoData: CreateProductoDto = req.body;
            const nuevoProducto = await this.productoService.create(productoData);
            // 201 Created: Indica que el recurso fue creado exitosamente
            res.status(201).json(nuevoProducto); 
        } catch (error) {
            next(error);
        }
    };

    /**
     * Controlador para actualizar un producto existente.
     * Maneja la lógica de la ruta PATCH /:id (o PUT)
     */
    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const productoData: UpdateProductoDto = req.body;
            const productoActualizado = await this.productoService.update(id, productoData);
            res.status(200).json(productoActualizado);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Controlador para eliminar un producto.
     * Maneja la lógica de la ruta DELETE /:id
     */
    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.productoService.remove(id);
            // 204 No Content: Indica éxito pero no hay nada que devolver
            res.status(204).send(); 
        } catch (error) {
            next(error);
        }
    };
}