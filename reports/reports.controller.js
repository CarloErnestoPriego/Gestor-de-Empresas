import ExcelJS from 'exceljs';
import Enterprise from '../models/enterprise.model.js'; // Asegúrate de que la ruta sea correcta

export const generateEnterpriseReport = async (req, res) => {
    try {
        // Recuperar todas las empresas activas
        const enterprises = await Enterprise.find({ status: true });

        // Crear un nuevo libro de trabajo (workbook)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        // Definir las columnas del reporte
        worksheet.columns = [
            { header: 'ID', key: '_id', width: 20 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Industria', key: 'industry', width: 20 },
            { header: 'Descripción', key: 'description', width: 50 },
            { header: 'Correo', key: 'email', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 20 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 15 },
            { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
            { header: 'Categoría Empresarial', key: 'businessCategory', width: 25 },
        ];

        // Agregar filas con los datos de las empresas
        enterprises.forEach(enterprise => {
            worksheet.addRow({
                _id: enterprise._id,
                name: enterprise.name,
                industry: enterprise.industry,
                description: enterprise.description,
                email: enterprise.email,
                phone: enterprise.phone,
                impactLevel: enterprise.impactLevel,
                yearsOfExperience: enterprise.yearsOfExperience,
                businessCategory: enterprise.businessCategory,
            });
        });

        // Establecer el nombre del archivo
        const filename = 'reporte_empresas.xlsx';

        // Enviar el archivo Excel como respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Escribir el archivo en la respuesta HTTP
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al generar el reporte de empresas',
            error,
        });
    }
};
