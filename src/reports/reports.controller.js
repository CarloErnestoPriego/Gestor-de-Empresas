import ExcelJS from 'exceljs';
import Enterprise from '../enterprise/enterprise.model.js';
import Client from '../client/client.model.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateEnterpriseReport = async (req, res) => {
    try {
        const enterprises = await Enterprise.find({ status: true });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 20 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Industria', key: 'industry', width: 20 },
            { header: 'Descripción', key: 'description', width: 50 },
            { header: 'Correo', key: 'email', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 20 },
            { header: 'Nivel de Impacto', key: 'impactLevel', width: 15 },
            { header: 'Años de Trayectoria', key: 'yearsOfExperience', width: 20 },
        ];

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
            });
        });

        const filename = 'reporte_empresas.xlsx';

        const reportesDir = path.join(__dirname, '..', 'reportes');
        
        if (!fs.existsSync(reportesDir)) {
            fs.mkdirSync(reportesDir);
        }

        const filePath = path.join(reportesDir, filename);

        await workbook.xlsx.writeFile(filePath);
        console.log('Archivo guardado en la carpeta reportes.');

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {

        console.error("Error al generar el reporte:", error);

        res.status(500).json({
            success: false,
            msg: 'Error al generar el reporte de empresas',
            error: error.message || error,
        });
    }
};

export const generateClientReport = async (req, res) => {
    try {
        // Recuperar todos los clientes activos
        const clients = await Client.find({ status: true });

        // Crear un nuevo libro de trabajo (workbook)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Clientes');

        // Definir las columnas del reporte
        worksheet.columns = [
            { header: 'ID', key: '_id', width: 20 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Apellido', key: 'lastname', width: 30 },
            { header: 'Correo', key: 'email', width: 30 },
            { header: 'Teléfono', key: 'phone', width: 20 },
        ];

        // Agregar filas con los datos de los clientes
        clients.forEach(client => {
            worksheet.addRow({
                _id: client._id,
                name: client.name,
                lastname: client.lastname,
                email: client.email,
                phone: client.phone,
            });
        });

        // Definir el nombre del archivo
        const filename = 'reporte_clientes.xlsx';

        // Ruta para guardar el archivo en la carpeta 'reportes'
        const reportesDir = path.join(__dirname, '..', 'reportes');
        
        // Crear la carpeta 'reportes' si no existe
        if (!fs.existsSync(reportesDir)) {
            fs.mkdirSync(reportesDir);
        }

        // Ruta completa del archivo en la carpeta 'reportes'
        const filePath = path.join(reportesDir, filename);

        // Guardar el archivo en el servidor en la carpeta 'reportes'
        await workbook.xlsx.writeFile(filePath);
        console.log('Archivo guardado en la carpeta reportes.');

        // Configurar los encabezados para la descarga
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Enviar el archivo al cliente
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        // Log de los errores detallados
        console.error("Error al generar el reporte:", error);

        // Responder con el error detallado
        res.status(500).json({
            success: false,
            msg: 'Error al generar el reporte de clientes',
            error: error.message || error,  // Mostrar el mensaje del error o el objeto de error
        });
    }
};
