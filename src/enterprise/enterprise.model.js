import { Schema, model } from 'mongoose';

const enterpriseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la empresa es requerido']
    },
    industry: {
        type: String,
        required: [true, 'Por favor, especifique la industria de la empresa']
    },
    description: {
        type: String,
        required: [true, 'Agrega una descripción de la empresa']
    },
    email: {
        type: String,
        required: [true, 'El correo de la empresa es requerido'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'El número de teléfono de la empresa es requerido']
    },
    impactLevel: {
        type: String,
        enum: ['Bajo', 'Medio', 'Alto'],
        required: [true, 'El nivel de impacto es requerido']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Los años de trayectoria son requeridos'],
        min: [0, 'Los años de trayectoria no pueden ser negativos']
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

enterpriseSchema.methods.toJSON = function () {

    const { __v, password, _id, ...enterprise } = this.toObject();

    enterprise.uid = _id;

    return enterprise
}

export default model('Enterprise', enterpriseSchema);
