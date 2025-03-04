import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    name: {
        type: "String",
        required: [true, 'El nombre del cliente es requrido']
    },
    lastname: {
        type: "String",
        required: [true, 'El apellido del cliente es requrido']
    },
    email: {
        type: "String",
        required: [true, 'El correo del cliente es requrido']
    },  
    phone: {
        type: "String",
        required: [true, 'El numero de telefono del cliente es requrido']
    },
    status: {
        type: Boolean,
        default: true
    }
});

clientSchema.methods.toJSON = function () {

    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario
}


export default model('Client', clientSchema);