import { Router } from 'express';
import { ItemCarritoController } from '../controllers/item-carrito.controller';

const controller = new ItemCarritoController();
const router = Router();

/**
 * @openapi
 * /api/items-carrito:
 *   get:
 *     summary: Obtener todos los items de carrito
 *     tags:
 *       - ItemsCarrito
 *     responses:
 *       200:
 *         description: Lista de items de carrito
 *   post:
 *     summary: Crear un item de carrito
 *     tags:
 *       - ItemsCarrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carritoId:
 *                 type: string
 *               productoId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item de carrito creado
 *
 * /api/items-carrito/{id}:
 *   get:
 *     summary: Obtener item de carrito por ID
 *     tags:
 *       - ItemsCarrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item de carrito
 *     responses:
 *       200:
 *         description: Item de carrito encontrado
 *   patch:
 *     summary: Actualizar item de carrito
 *     tags:
 *       - ItemsCarrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item de carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item de carrito actualizado
 *   delete:
 *     summary: Eliminar item de carrito
 *     tags:
 *       - ItemsCarrito
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item de carrito
 *     responses:
 *       200:
 *         description: Item de carrito eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const ItemCarritoRouter = router;
