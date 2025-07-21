import { Router } from 'express';
import { DepartamentoController } from '../controllers/departamento.controller';

const controller = new DepartamentoController();
const router = Router();

/**
 * @openapi
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags:
 *       - Departamentos
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *   post:
 *     summary: Crear un departamento
 *     tags:
 *       - Departamentos
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
 *         description: Departamento creado
 *
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtener departamento por ID
 *     tags:
 *       - Departamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *   patch:
 *     summary: Actualizar departamento
 *     tags:
 *       - Departamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
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
 *         description: Departamento actualizado
 *   delete:
 *     summary: Eliminar departamento
 *     tags:
 *       - Departamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export const DepartamentoRouter = router;
