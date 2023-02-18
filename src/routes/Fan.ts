import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';
import { createNewFan, EditFanInformation } from '../controllers/FanController';

const router = express.Router();


/**
 * @swagger
 * 
 * /api/fans:
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
router.post('/' , AuthenticateJWT,  createNewFan);


/**
 * @swagger
 * 
 * /api/fans/edit:
 *  post:
 *      summary: Edit Fan Information
 *      tags:
 *          -  Fan
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateFan'
 *      responses:
 *          200:
 *              description: Brand updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response' 
 */
router.post('/edit',AuthenticateJWT, EditFanInformation);


export default router;