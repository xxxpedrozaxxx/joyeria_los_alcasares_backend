import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

const controller = new PedidoController();
const router = Router();

/**
 * @openapi
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *   post:
 *     summary: Crear un pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Pedido creado
 *
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *   patch:
 *     summary: Actualizar pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *   delete:
 *     summary: Eliminar pedido
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const PedidoRouter = router;
