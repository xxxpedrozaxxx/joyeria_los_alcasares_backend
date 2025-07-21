import { Router } from 'express';
import { ProductoMaterialController } from '../controllers/producto-material.controller';

const controller = new ProductoMaterialController();
const router = Router();

/**
 * @openapi
 * /api/producto-materiales:
 *   get:
 *     summary: Obtener todas las relaciones producto-material
 *     tags:
 *       - ProductoMaterial
 *     responses:
 *       200:
 *         description: Lista de relaciones producto-material
 *   post:
 *     summary: Crear una relación producto-material
 *     tags:
 *       - ProductoMaterial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productoId:
 *                 type: string
 *               materialId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Relación producto-material creada
 *
 * /api/producto-materiales/{productoId}/{materialId}:
 *   get:
 *     summary: Obtener relación producto-material por IDs
 *     tags:
 *       - ProductoMaterial
 *     parameters:
 *       - in: path
 *         name: productoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *       - in: path
 *         name: materialId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del material
 *     responses:
 *       200:
 *         description: Relación encontrada
 *   patch:
 *     summary: Actualizar relación producto-material
 *     tags:
 *       - ProductoMaterial
 *     parameters:
 *       - in: path
 *         name: productoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *       - in: path
 *         name: materialId
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
 *               productoId:
 *                 type: string
 *               materialId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Relación actualizada
 *   delete:
 *     summary: Eliminar relación producto-material
 *     tags:
 *       - ProductoMaterial
 *     parameters:
 *       - in: path
 *         name: productoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *       - in: path
 *         name: materialId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del material
 *     responses:
 *       200:
 *         description: Relación eliminada
 */

router.get('/', controller.getAll);
router.get('/:productoId/:materialId', controller.getById);
router.post('/', controller.create);
router.patch('/:productoId/:materialId', controller.update);
router.delete('/:productoId/:materialId', controller.remove);

export const ProductoMaterialRouter = router;
