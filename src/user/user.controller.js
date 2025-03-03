// user.service.js

import faker from 'faker';
import User from './user.model.js'; 

export const createRandomUser = async () => {

    const userCount = await User.countDocuments();

    if (userCount > 0) {
        console.log('<< Ya existe un usuario en la base de datos. No se generará un nuevo usuario. >>');
        return;
    }

    const name = faker.name.firstName();
    const surname = faker.name.lastName();
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(8);
    const profilePicture = faker.image.avatar();
    const phone = faker.phone.phoneNumber('########');
    const role = 'ADMIN_ROLE'; 
    const estado = true;

    const user = new User({
        name,
        surname,
        username,
        email,
        password,
        profilePicture,
        phone,
        role,
        estado,
    });

    try {
        const savedUser = await user.save();
        console.log('Usuario generado:', savedUser);
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
    }
};
