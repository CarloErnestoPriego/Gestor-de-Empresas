import mongoose from 'mongoose';
import faker from 'faker';
import User from './models/User';

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.log('Error al conectar a la base de datos', err));

async function createRandomUser() {
  const user = new User({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    profilePicture: faker.image.avatar(),
    phone: faker.phone.phoneNumber('########'),
    role: faker.random.arrayElement(['ADMIN_ROLE', 'USER_ROLE']),
    estado: true,
  });

  try {
    const savedUser = await user.save();
    console.log('Usuario generado:', savedUser);
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
  }
}

createRandomUser();
