import { Schema, model } from "mongoose";


const clienteSchema = new Schema({
    numeroCuenta:{
        type:Number,
        unique:true,
        default:null

    },
    documentoCliente:{
        type:Number,
        unique:true,
        default:null
        
    },
    fechaApertura:{
        type:Date,
        default:null
    },
    saldo:{
        type:Number,
        default:null
    },
    claveAcceso:{
        type:Number,
        default:null
    }
})
clienteSchema.pre('save', async function (next) {
    if (this.isModified('claveAcceso')) {
        const salt = await bcrypt.genSalt(10);
        this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
    }
    next();
});

export default model ('Cliente', clienteSchema, 'cliente')
