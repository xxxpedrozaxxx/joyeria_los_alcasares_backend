import { Router } from 'express';
import { DetallePedidoController } from '../controllers/detalle-pedido.controller';

const controller = new DetallePedidoController();
const router = Router();

/**
 * @openapi
 * /api/detalles-pedido:
 *   get:
 *     summary: Obtener todos los detalles de pedido
 *     tags:
 *       - DetallesPedido
 *     responses:
 *       200:
 *         description: Lista de detalles de pedido
 *   post:
 *     summary: Crear un detalle de pedido
 *     tags:
 *       - DetallesPedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *               productoId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Detalle de pedido creado
 *
 * /api/detalles-pedido/{id}:
 *   get:
 *     summary: Obtener detalle de pedido por ID
 *     tags:
 *       - DetallesPedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de pedido
 *     responses:
 *       200:
 *         description: Detalle de pedido encontrado
 *   patch:
 *     summary: Actualizar detalle de pedido
 *     tags:
 *       - DetallesPedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: number
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Detalle de pedido actualizado
 *   delete:
 *     summary: Eliminar detalle de pedido
 *     tags:
 *       - DetallesPedido
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del detalle de pedido
 *     responses:
 *       200:
 *         description: Detalle de pedido eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const DetallePedidoRouter = router;
