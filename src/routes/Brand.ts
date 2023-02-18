import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';
import {  createNewBrand } from '../controllers/BrandController';

const router = express.Router();

/**
 * @swagger
 * 
 * /api/brands/create:
 *  post:
 *      summary: Create a new Brand
 *      tags:
 *          - Brand
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBrand'
 *      responses:
 *          201:
 *              description: Brand Created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response' 
 */
router.post('/create', AuthenticateJWT, createNewBrand);

export default router;