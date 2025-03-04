import Enterprise from '../enterprise/enterprise.model.js';
import Client from '../client/client.model.js';

export const filterEntities = async (req, res) => {
    const { filter, sort, entityType } = req.body;

    try {
        let query = {};

        if (entityType === 'enterprise') {
            if (filter) {
                if (filter.yearsOfExperience) {
                    query.yearsOfExperience = { $gte: filter.yearsOfExperience };
                }

                if (filter.businessCategory) {
                    query.businessCategory = filter.businessCategory;
                }
            }
        } else if (entityType === 'client') {
            if (filter) {
                if (filter.yearsOfExperience) {
                    query.yearsOfExperience = { $gte: filter.yearsOfExperience };
                }
            }
        }

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

        let entities;
        if (entityType === 'enterprise') {
            console.log("Query para empresas:", query);
            entities = await Enterprise.find(query).sort(sortCriteria);
        } else if (entityType === 'client') {
            entities = await Client.find(query).sort(sortCriteria);
        }

        if (entities.length === 0) {
            return res.status(200).json({
                success: true,
                msg: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)}(s) no encontrados`,
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            msg: `${entityType.charAt(0).toUpperCase() + entityType.slice(1)}(s) encontrados`,
            data: entities,
        });

    } catch (error) {
        console.error(`Error al filtrar ${entityType}s:`, error);
        return res.status(500).json({
            success: false,
            msg: `Error al filtrar las ${entityType}s`,
            error: error.message || error,
        });
    }
};
