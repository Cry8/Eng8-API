import express from 'express';
import userRoutes from '../src/routes/User';
import otpRoutes from '../src/routes/OTP';
import brandRoutes from '../src/routes/Brand';
import fanRoutes from '../src/routes/Fan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import 'dotenv/config';

import Knex from 'knex';
import { Model } from 'objection';
import knexfile from '../knexfile';

const knex = Knex(knexfile.development);


Model.knex(knex);



const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/fans', fanRoutes);

export default app