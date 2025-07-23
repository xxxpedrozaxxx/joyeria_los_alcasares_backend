import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller';

// Opcional pero recomendado: un middleware de validación
// import { validationMiddleware } from '../../middleware/validation.middleware'; 
// import { CreateProductoDto, UpdateProductoDto } from './dtos/productos/create-producto.dto';

// Instanciamos el controlador para acceder a sus métodos
const controller = new ProductoController();

/**
 * @openapi
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *   post:
 *     summary: Crear un producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               garantia:
 *                 type: string
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               topSale:
 *                 type: boolean
 *               categoriaId:
 *                 type: string
 *               proveedorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 *
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *   patch:
 *     summary: Actualizar producto
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               garantia:
 *                 type: string
 *               stock:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               topSale:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *   delete:
 *     summary: Eliminar producto
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 */

// Creamos una nueva instancia del Router de Express
const router = Router();

// Definimos las rutas del CRUD para Productos
// Sintaxis: router.METHOD(ENDPOINT, [MIDDLEWARES], CONTROLLER_METHOD);

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

// Aquí podrías añadir un middleware para validar que el req.body coincida con CreateProductoDto
// Ejemplo: router.post('/', validationMiddleware(CreateProductoDto), controller.create);
router.post('/', controller.create); 

// PATCH es más apropiado para actualizaciones parciales
router.patch('/:id', controller.update);

router.delete('/:id', controller.remove);

export const ProductoRouter = router;