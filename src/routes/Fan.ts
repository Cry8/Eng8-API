import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';
import { createNewFan } from '../controllers/FanController';

const router = express.Router();


/**
 * @swagger
 * 
 * /api/fans/create:
 *  post:
 *      summary: Create a new Brand
 *      tags:
 *          - Fan
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateFan'
 *      responses:
 *          201:
 *              description: Brand Created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response' 
 */
router.post('/create' , AuthenticateJWT,  createNewFan);

export default router;