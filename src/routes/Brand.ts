import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';
import {  createNewBrand, EditBrandInformation } from '../controllers/BrandController';

const router = express.Router();

/**
 * @swagger
 * 
 * /api/brands:
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
router.post('/', AuthenticateJWT, createNewBrand);

/**
 * @swagger
 * 
 * /api/brands/edit:
 *  post:
 *      summary: Edit Brand Information
 *      tags:
 *          -  Brand
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBrand'
 *      responses:
 *          200:
 *              description: Brand updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response' 
 */
router.post('/edit', AuthenticateJWT, EditBrandInformation);

export default router;