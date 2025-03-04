'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from '../src/auth/auth.routes.js';
import reportsRoutes from '../src/reports/reports.routes.js';
import clientRoutes from '../src/client/client.routes.js';
import enterpriseRoutes from '../src/enterprise/enterprise.routes.js';
import filterRoutes from '../src/filter/filter.routes.js'
import {createRandomUser} from '../src/user/user.controller.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use('/coperex/v1/auth', authRoutes);
    app.use('/coperex/v1/client', clientRoutes);
    app.use('/coperex/v1/enterprise', enterpriseRoutes);
    app.use('/coperex/v1/filter', filterRoutes);
    app.use('/coperex/v1/reports', reportsRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('Conexion a la Base de Datos Exitosa');

        await createRandomUser();
    } catch (error) {
        console.error('Error Conectandose a la Base de Datos', error);
        process.exit(1);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Servidor Corriedo en el Puero ${port}`);
    } catch (e) {
        console.log(`Fallo en la Incializacion del Servidor: ${e}`);
    }
}