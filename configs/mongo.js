'use strict';

import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
          console.log('MongoDB | Could not be connected to MongoDB')
          mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Intentando la Conexion')
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado a MongoDB')
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB | Conectado a la Base de Datos')
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconectando a la Base de Datos')
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Desconectado')
        });
        mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });
    } catch (error) {
        console.log('Conexion a la base de datos fallida', error)
    }
}