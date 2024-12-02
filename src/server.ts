import { Request, Response, NextFunction } from "express";
import 'express-async-errors' ;
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'
import YAML from 'yamljs';
import express from 'express'
import  router  from './routes/routes';
import { handleError } from "./utils/error/error-handle";
import path from 'path'

 const app = express();

 const swaggerDocument = YAML.load(path.resolve(__dirname, "../swagger.yaml"));

dotenv.config();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "..", "views"));
app.use('files', express.static(path.resolve(__dirname, "..", "tmp")));
app.use('/api/v1',router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(handleError);

app.listen(process.env.PORT, () => {
    console.log( ` Server is running on port ${process.env.PORT}`);
})

export {app}