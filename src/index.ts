import server from '../utils/server';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ENG8 Rest Api',
        version: '1.0.0'
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    servers: [
        {
            url: 'http://localhost:8080',
            description: "Development Server"
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
}


const swaggerSpec = swaggerJSDoc(options);


server.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


server.get('/health-check', (req, res) => {
    res.json({
        message: "Eng8 API is healthy!"
    })
})


server.listen(process.env.PORT, () => console.log(`Server listening at port: ${process.env.PORT}`))