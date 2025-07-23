import { Router } from 'express';
import { ContactoController } from '../controllers/contacto.controller';

const controller = new ContactoController();
const router = Router();

/**
 * @openapi
 * /api/contacto:
 *   post:
 *     summary: Enviar mensaje de contacto
 *     tags:
 *       - Contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje almacenado exitosamente
 */
router.post('/', controller.create);

export const ContactoRouter = router;
