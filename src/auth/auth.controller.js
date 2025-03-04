import { hash, verify } from 'argon2'
import User from '../user/user.model.js'; 
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "CREDENCIALES INVALIDAS",
                error: "NO EXISTE EL USUARIO O CORREO INGRESADO"
            });
        }

        const hashedPassword = user.password;
        
        if (hashedPassword !== password) {
            return res.status(400).json({
                message: "CREDENCIALES INVALIDAS",
                error: "CONTRASEÑA INCORRECTA"
            });
        }

        const token = await generarJWT(user.id);

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
