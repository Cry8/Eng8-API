import express from 'express';
import { verifyOTP, resendOTP } from '../controllers/OTPController';

const router = express.Router();

/**
 * @swagger
 * /api/otp/verify-otp:
 *  post:
 *      summary: verify that otp is correct
 *      tags:
 *          - OTP
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifyOTP'
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *                  
 */
router.post('/verify-otp', verifyOTP);


/**
 * @swagger
 * /api/otp/resend-otp:
 *  post:
 *    summary: resend an otp
 *    tags:
 *      - OTP
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ResendOTP'
 *    responses:
 *      200:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Response'
 *                  
 */
router.post('/resend-otp', resendOTP);


export default router;