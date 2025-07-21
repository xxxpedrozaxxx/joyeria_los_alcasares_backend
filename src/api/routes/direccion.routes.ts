import { Router } from 'express';
import { DireccionController } from '../controllers/direccion.controller';

const controller = new DireccionController();
const router = Router();

/**
 * @openapi
 * /api/direcciones:
 *   get:
 *     summary: Obtener todas las direcciones
 *     tags:
 *       - Direcciones
 *     responses:
 *       200:
 *         description: Lista de direcciones
 *   post:
 *     summary: Crear una dirección
 *     tags:
 *       - Direcciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion:
 *                 type: string
 *               usuarioId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dirección creada
 *
 * /api/direcciones/{id}:
 *   get:
 *     summary: Obtener dirección por ID
 *     tags:
 *       - Direcciones
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección encontrada
 *   patch:
 *     summary: Actualizar dirección
 *     tags:
 *       - Direcciones
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la dirección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dirección actualizada
 *   delete:
 *     summary: Eliminar dirección
 *     tags:
 *       - Direcciones
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección eliminada
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const DireccionRouter = router;
