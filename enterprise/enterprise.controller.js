import Enterprise from './enterprise.model.js';

export const getEnterprises = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, enterprises] = await Promise.all([
            Enterprise.countDocuments(query),
            Enterprise.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            enterprises
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener empresas",
            error
        });
    }
}

export const getEnterpriseById = async (req, res) => {
    try {
        const { id } = req.params;

        const enterprise = await Enterprise.findById(id);

        if (!enterprise) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            enterprise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener empresa',
            error
        });
    }
}

export const createEnterprise = async (req, res) => {
    try {
        const { name, industry, description, email, phone, impactLevel, yearsOfExperience, businessCategory } = req.body;

        const newEnterprise = new Enterprise({
            name,
            industry,
            description,
            email,
            phone,
            impactLevel,
            yearsOfExperience,
            businessCategory
        });

        const savedEnterprise = await newEnterprise.save();

        res.status(201).json({
            success: true,
            msg: 'Empresa creada exitosamente',
            enterprise: savedEnterprise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al crear la empresa',
            error
        });
    }
}

export const updateEnterprise = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body; // Se evita actualizar el _id

        const enterprise = await Enterprise.findByIdAndUpdate(id, data, { new: true });

        if (!enterprise) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Empresa actualizada',
            enterprise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar empresa',
            error
        });
    }
}

export const deleteEnterprise = async (req, res) => {
    try {
        const { id } = req.params;

        const enterprise = await Enterprise.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!enterprise) {
            return res.status(404).json({
                success: false,
                msg: 'Empresa no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Empresa desactivada',
            enterprise
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al desactivar empresa',
            error
        });
    }
}
