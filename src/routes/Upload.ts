import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';
import { addNewUpload, getUpload } from '../controllers/UploadController';
import uploader from '../../utils/multer';

const router = express.Router();


/**
 * @swagger
 * 
 * /api/uploads:
 *  post:
 *      summary: Add a New Upload
 *      tags:
 *          - Upload
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUpload'                
 * 
 *      responses:
 *          200:
 *              description: File Uploaded successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *              
 */
router.post('/', [uploader.single('imgfile'), AuthenticateJWT], addNewUpload);


/**
 * @swagger
 * 
 * /api/uploads/{id}:
 *  get:
 *      summary: Get Upload
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: File retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.get('/:id', AuthenticateJWT, getUpload);


/**
 * @swagger
 * 
 * /api/uploads/{userId}/user:
 *  delete:
 *      summary: Delete User Upload
 *      tags:
 *          - Upload
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: File deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */


export default router;