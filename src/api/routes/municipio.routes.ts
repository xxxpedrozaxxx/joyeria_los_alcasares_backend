import { Router } from 'express';
import { MunicipioController } from '../controllers/municipio.controller';

const controller = new MunicipioController();
const router = Router();

/**
 * @openapi
 * /api/municipios:
 *   get:
 *     summary: Obtener todos los municipios
 *     tags:
 *       - Municipios
 *     responses:
 *       200:
 *         description: Lista de municipios
 *   post:
 *     summary: Crear un municipio
 *     tags:
 *       - Municipios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               codigoDepartamento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Municipio creado
 *
 * /api/municipios/{codigoMunicipio}:
 *   get:
 *     summary: Obtener municipio por código
 *     tags:
 *       - Municipios
 *     parameters:
 *       - in: path
 *         name: codigoMunicipio
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del municipio
 *     responses:
 *       200:
 *         description: Municipio encontrado
 *   patch:
 *     summary: Actualizar municipio
 *     tags:
 *       - Municipios
 *     parameters:
 *       - in: path
 *         name: codigoMunicipio
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del municipio
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
 *         description: Municipio actualizado
 *   delete:
 *     summary: Eliminar municipio
 *     tags:
 *       - Municipios
 *     parameters:
 *       - in: path
 *         name: codigoMunicipio
 *         schema:
 *           type: string
 *         required: true
 *         description: Código del municipio
 *     responses:
 *       200:
 *         description: Municipio eliminado
 */

router.get('/', controller.getAll);
router.get('/:codigoMunicipio', controller.getById);
router.post('/', controller.create);
router.patch('/:codigoMunicipio', controller.update);
router.delete('/:codigoMunicipio', controller.remove);

export const MunicipioRouter = router;
