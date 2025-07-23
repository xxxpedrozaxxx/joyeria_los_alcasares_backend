import { Router } from 'express';
import { NewslatterController } from '../controllers/newslatter.controller';

const controller = new NewslatterController();
const router = Router();

/**
 * @openapi
 * /api/newslatter:
 *   post:
 *     summary: Suscribirse al newslatter
 *     tags:
 *       - Newslatter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo almacenado exitosamente
 */
router.post('/', controller.create);

export const NewslatterRouter = router;
