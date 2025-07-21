import { Router } from 'express';
import { CarritoController } from '../controllers/carrito.controller';

const controller = new CarritoController();
const router = Router();

/**
 * @openapi
 * /api/carritos:
 *   get:
 *     summary: Obtener todos los carritos
 *     tags:
 *       - Carritos
 *     responses:
 *       200:
 *         description: Lista de carritos
 *   post:
 *     summary: Crear un carrito
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
 *   get:
 *     summary: Obtener carrito por ID
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
 *       200:
 *         description: Carrito encontrado
 *   patch:
 *     summary: Actualizar carrito
 *     tags:
 *       - Carritos
 *     parameters:
 *       - in: path
 *         name: id
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
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado
 *   delete:
 *     summary: Eliminar carrito
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
 *       200:
 *         description: Carrito eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const CarritoRouter = router;
