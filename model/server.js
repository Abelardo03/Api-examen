import express, { json } from "express";
import 'dotenv/config'
import dbconnection from "../Database/config.js"
import ExamenRouter from "../Routers/ExamenRoute.js";

class server{
    constructor(){
    this.app = express()
    this.listen()
    this.router()
    this.dbconnection()
    }
    async dbconnection(){
        await dbconnection()
    }
    router(){
        this.app.use(json())
        this.app.use('/api/cliente',ExamenRouter)
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`)})
    }
}

export default server