import { Router } from "express";

const ExamenRouter = Router()
import {getcliente,
    postcliente,
    postclienteconsignar,
    postclienteretiro,
    deletecliente} from "../Controllers/clienteController.js"

    ExamenRouter.get('/clientes', getcliente);  
    ExamenRouter.post('/clientes', postcliente);    
    ExamenRouter.post('/clientes/:id/consignar', postclienteconsignar);
    ExamenRouter.post('/clientes/:id/retiro', postclienteretiro);
    ExamenRouter.delete('/clientes/:id', deletecliente)

export default ExamenRouter