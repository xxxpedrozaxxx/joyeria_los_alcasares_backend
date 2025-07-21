import { Router } from 'express';
import { ProveedorController } from '../controllers/proveedor.controller';

const controller = new ProveedorController();
const router = Router();

/**
 * @openapi
 * /api/proveedores:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags:
 *       - Proveedores
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *   post:
 *     summary: Crear un proveedor
 *     tags:
 *       - Proveedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor creado
 *
 * /api/proveedores/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 *   patch:
 *     summary: Actualizar proveedor
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *   delete:
 *     summary: Eliminar proveedor
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const ProveedorRouter = router;
