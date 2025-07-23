import { Router } from 'express';
import { CarritoController } from '../controllers/carrito.controller';

const controller = new CarritoController();
const router = Router();

/**
 * @openapi
 * /api/carritos/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener o crear un carrito para un usuario
 *     tags:
 *       - Carritos
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Carrito del usuario
 *
 * /api/carritos/{carritoId}/items:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags:
 *       - Carritos
 *     parameters:
 *       - in: path
 *         name: carritoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productoId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *
 * /api/carritos/{carritoId}/items/{itemId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags:
 *       - Carritos
 *     parameters:
 *       - in: path
 *         name: carritoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del item del carrito
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *
 * /api/carritos:
 *   post:
 *     summary: Crear un carrito (legacy)
 *     tags:
 *       - Carritos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carrito creado
 *
 * /api/carritos/{id}:
 *   delete:
 *     summary: Eliminar carrito (legacy)
 *     tags:
 *       - Carritos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       204:
 *         description: Carrito eliminado
 */

router.get('/usuario/:usuarioId', controller.getByUsuarioId);
router.post('/:carritoId/items', controller.addItemToCarrito);
router.delete('/:carritoId/items/:itemId', controller.removeItemFromCarrito);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

export const CarritoRouter = router;
