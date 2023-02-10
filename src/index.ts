import server from '../utils/server';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import 'dotenv/config';


server.use(cors());
server.use(helmet());
server.use(express.json());



server.get('/health-check', (req, res) => {
    res.json({
        message: "Eng8 API is healthy!"
    })
})


server.listen(process.env.PORT, () => console.log(`Server listening at port: ${process.env.PORT}`))