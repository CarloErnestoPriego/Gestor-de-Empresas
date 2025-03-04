import Enterprise from '../enterprise/enterprise.model.js';
import { isValidObjectId } from 'mongoose';

export const filterAndEditEnterprises = async (req, res) => {
    const { filter, sort, editData } = req.body;

    try {
        let query = {};

        if (filter) {
            if (filter.yearsOfExperience) {
                query.yearsOfExperience = { $gte: filter.yearsOfExperience };
            }

            if (filter.businessCategory) {
                query.businessCategory = filter.businessCategory;
            }
        }

        // Ordenar (A-Z o Z-A)
        let sortCriteria = {};
        if (sort) {
            if (sort === 'A-Z') {
                sortCriteria.name = 1;
            } else if (sort === 'Z-A') {
                sortCriteria.name = -1;
            } else if (sort === 'yearsOfExperience') {
                sortCriteria.yearsOfExperience = 1; 
            } else if (sort === 'yearsOfExperienceDesc') {
                sortCriteria.yearsOfExperience = -1;
            }
        }

        const enterprises = await Enterprise.find(query).sort(sortCriteria);

        if (editData && editData.id) {
            const { id, ...updateFields } = editData;
            
            if (!isValidObjectId(id)) {
                return res.status(400).json({ success: false, msg: 'ID inválido' });
            }
            const updatedEnterprise = await Enterprise.findByIdAndUpdate(id, updateFields, { new: true });
            
            if (!updatedEnterprise) {
                return res.status(404).json({ success: false, msg: 'Empresa no encontrada' });
            }

            return res.status(200).json({
                success: true,
                msg: 'Empresa actualizada con éxito',
                data: updatedEnterprise,
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Empresas encontradas',
            data: enterprises,
        });

    } catch (error) {
        console.error('Error al filtrar y editar empresas:', error);
        return res.status(500).json({
            success: false,
            msg: 'Error al filtrar y editar las empresas',
            error: error.message || error,
        });
    }
};
