# API para Registro de Empresas y Clientes

Al momento de correr el proyecto, se generará automáticamente un usuario con datos generados aleatoriamente gracias a la libreria faker con el cual se podrá iniciar sesión. Para autenticarse, se debe utilizar el siguiente cuerpo en la petición de login:

### Cuerpo de la Solicitud

```json
{
    "username": "Immanuel15",
    "email": "Shayne23@hotmail.com",
    "password": "$argon2id$v=19$m=65536,t=3,p=4$wBjMHovWx8ydN9koTcc51w$kzi3cHIuz6jTTfUBnyJhtA8ufPEWSogSz2MJDR7y0vE"
}
```

## NOTA

La contraseña debe mantenerse en el mismo formato en el que se encuentra en la base de datos para garantizar una autenticación correcta.

