import Client from './client.model.js';

export const createClient = async (req, res) => {
    try {
        const { name, lastname, email, phone } = req.body;

        const newClient = new Client({
            name,
            lastname,
            email,
            phone
        });

        const savedClient = await newClient.save();

        res.status(201).json({
            success: true,
            msg: 'Cliente creado exitosamente',
            client: savedClient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al crear el cliente',
            error
        });
    }
}

export const getClients = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, clients] = await Promise.all([
            Client.countDocuments(query),
            Client.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            clients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener clientes",
            error
        });
    }
}

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({
                success: false,
                msg: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener cliente',
            error
        });
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const client = await Client.findByIdAndUpdate(id, data, { new: true });

        if (!client) {
            return res.status(404).json({
                success: false,
                msg: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Cliente actualizado',
            client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar cliente',
            error
        });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!client) {
            return res.status(404).json({
                success: false,
                msg: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Cliente desactivado',
            client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar cliente',
            error
        });
    }
}
