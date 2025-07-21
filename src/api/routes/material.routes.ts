import { Router } from 'express';
import { MaterialController } from '../controllers/material.controller';

const controller = new MaterialController();
const router = Router();

/**
 * @openapi
 * /api/materiales:
 *   get:
 *     summary: Obtener todos los materiales
 *     tags:
 *       - Materiales
 *     responses:
 *       200:
 *         description: Lista de materiales
 *   post:
 *     summary: Crear un material
 *     tags:
 *       - Materiales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Material creado
 *
 * /api/materiales/{id}:
 *   get:
 *     summary: Obtener material por ID
 *     tags:
 *       - Materiales
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del material
 *     responses:
 *       200:
 *         description: Material encontrado
 *   patch:
 *     summary: Actualizar material
 *     tags:
 *       - Materiales
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Material actualizado
 *   delete:
 *     summary: Eliminar material
 *     tags:
 *       - Materiales
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del material
 *     responses:
 *       200:
 *         description: Material eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const MaterialRouter = router;
