
import cliente from "../model/cliente.js";

export async function getcliente(req, res) {
    try {
        const clientes = await cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'error buscando cliente' });
    }
}

export async function postcliente(req, res) {
    const { documentoCliente, fechaApertura, saldo, claveAcceso } = req.body;
    let msg = 'The product is inserted successfully';

    const nuevoCliente = new cliente({
        numeroCuenta: (await cliente.countDocuments()) + 1,
        documentoCliente,
        claveAcceso: parseInt(claveAcceso)
    });

    try {
        await nuevoCliente.save();
        res.json({ msg });
    } catch (error) {
        res.status(500).json({ msg: 'Error inserting client', error });
    }
}

export async function postclienteconsignar(req, res) {
        const { monto } = req.body;
        if (monto <= 0) return res.status(400).send('El monto debe ser mayor que 0.');
    
        const clientes = await cliente.findById(req.params.id);
        if (!clientes) return res.status(404).send('La cuenta no existe.');
    
        clientes.saldo += monto;
        await clientes.save();
    
        res.send(clientes);
}

export async function postclienteretiro(req, res) {
    const { monto } = req.body;
    if (monto <= 0) return res.status(400).send('El monto debe ser mayor que 0.');

    const clientes = await cliente.findById(req.params.id);
    if (!clientes) return res.status(404).send('La cuenta no existe.');

    if (monto > cliente.saldo) return res.status(400).send('Saldo insuficiente.');

    clientes.saldo -= monto;
    await clientes.save();

    res.send(clientes);
};



export async function deletecliente(req, res) {
    const id = req.params.id
    try{
        await cliente.findByIdAndDelete(id)
        res.json('the acount delete succesfull')
    }catch(error){
        req.status(500).json(error,{msg:'there was problem deliting acount'})
    }
}