import { hash, verify } from 'argon2'
import User from '../user/user.model.js';  // Asegúrate de que el modelo de usuario esté importado correctamente
import { generarJWT } from '../helpers/generate-jwt.js';  // Suponiendo que este es tu generador de JWT

export const login = async (req, res) => {
    const { email, username, password } = req.body;  // Recibimos el correo o nombre de usuario y la contraseña
    try {
        // Buscar el usuario en la base de datos por correo o nombre de usuario
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]  // Buscamos por cualquiera de los dos campos
        });

        if (!user) {
            return res.status(400).json({
                message: "CREDENCIALES INVALIDAS",
                error: "NO EXISTE EL USUARIO O CORREO INGRESADO"
            });
        }

        const hashedPassword = user.password;
        
        const validPassword = await verify(hashedPassword, password);
        if (!validPassword) {
            return res.status(400).json({
                message: "CREDENCIALES INVALIDAS",
                error: "CONTRASEÑA INCORRECTA"
            });
        }

        // Generar un JWT para el usuario autenticado
        const token = await generarJWT(user.id);  // Suponiendo que `generateJWT` es una función que genera un JWT

        // Devolver la respuesta con el token y los detalles del usuario
        return res.status(200).json({
            message: "LOGIN COMPLETADO",
            userDetails: {
                token: token
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "LOGIN FALLIDO, ERROR DEL SERVIDOR",
            error: err.message
        });
    }
};
