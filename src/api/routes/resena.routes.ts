import { Router } from 'express';
import { ResenaController } from '../controllers/resena.controller';

const controller = new ResenaController();
const router = Router();

/**
 * @openapi
 * /api/resenas:
 *   get:
 *     summary: Obtener todas las reseñas
 *     tags:
 *       - Reseñas
 *     responses:
 *       200:
 *         description: Lista de reseñas
 *   post:
 *     summary: Crear una reseña
 *     tags:
 *       - Reseñas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *               productoId:
 *                 type: string
 *               comentario:
 *                 type: string
 *               calificacion:
 *                 type: number
 *     responses:
 *       201:
 *         description: Reseña creada
 *
 * /api/resenas/{id}:
 *   get:
 *     summary: Obtener reseña por ID
 *     tags:
 *       - Reseñas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña encontrada
 *   patch:
 *     summary: Actualizar reseña
 *     tags:
 *       - Reseñas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario:
 *                 type: string
 *               calificacion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Reseña actualizada
 *   delete:
 *     summary: Eliminar reseña
 *     tags:
 *       - Reseñas
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Reseña eliminada
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const ResenaRouter = router;
