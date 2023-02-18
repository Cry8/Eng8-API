/**
 * @swagger
 * components:
 *  schemas:
 *      Response: 
 *         type: object
 *         properties:
 *             status:
 *                type: boolean
 *             data:
 *                type: string
 *      CreateUser:
 *          type: object
 *          properties:
 *              email:
 *                 type: string
 *              user_type:
 *                 type: string
 *                 enum: [fan, brand]
 *              username:
 *                 type: string
 *              password:
 *                 type: string
 *      VerifyOTP:
 *          type: object
 *          properties:
 *              otp:
 *                  type: string
 *              token:
 *                  type: string
 *      ResendOTP:
 *          type: object
 *          properties:
 *              token: 
 *                  type: string
 *      LoginUser:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      CreateBrand:
 *          type: object
 *          properties:
 *              brand_name:
 *                  type: string
 *              bio:
 *                  type: string
 *              address:
 *                  type: string
 *              state:
 *                  type: string
 *              city:
 *                  type: string
 *              country:
 *                  type: string
 *              brand_image:
 *                  type: integer
 *              phone_number:
 *                  type: string
 *      CreateFan:
 *          type: object
 *          properties:
 *              full_name:
 *                  type: string
 *              phone_number:
 *                  type: string
 *              bio:
 *                  type: string
 *              address:
 *                  type: string
 *              city:
 *                  type: string
 *              state:
 *                  type: string
 *              country:
 *                  type: string
 *              profile_image:
 *                  type: integer
 * 
 *      CreateUpload:
 *          type: object
 *          properties:
 *              imgfile:
 *                  type: string
 *                  format: binary
 */