import { authenticateUser, createUser, getUserInfo } from '../controllers/UserController';
import express from 'express';
import AuthenticateJWT from '../../middlewares/AuthenticateJWT';

const router = express.Router();


/**
 * @swagger
 * /api/users/register:
 *  post:
 *      summary: Create a new User Account
 *      tags:
 *         - Account
 *      description: Create a new User Account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/CreateUser'
 *                          
 *      responses:
 *        201:
 *          description: User account created sucessfully
 *          content:
 *              application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/Response'
 */
router.post('/register', createUser);


/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Authenticate into User Account
 *      tags:
 *          - Account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUser'
 *      responses:
 *          200:
 *              description: Authentication successful
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Response'      
 *                  
 */
router.post('/login', authenticateUser)


/**
 * @swagger
 * /api/users/info:
 *  get:
 *      summary: Get User Information
 *      tags:
 *          - Account
 *      responses:
 *          200:    
 *              description: Successfully retrived user information
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
router.get('/info', AuthenticateJWT, getUserInfo)

export default router;