import { Router } from 'express';
import { CategoriaController } from '../controllers/categoria.controller';

const controller = new CategoriaController();
const router = Router();

/**
 * @openapi
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *   post:
 *     summary: Crear una categoría
 *     tags:
 *       - Categorías
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
 *         description: Categoría creada
 *
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *   patch:
 *     summary: Actualizar categoría
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
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
 *         description: Categoría actualizada
 *   delete:
 *     summary: Eliminar categoría
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const CategoriaRouter = router;
