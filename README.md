
# CustomerSystem

CustomerSystem es una aplicación de gestión de clientes basada en Node.js, utilizando Express y MySQL. Este proyecto permite gestionar una base de datos de usuarios con funcionalidades básicas de autenticación y conexión a base de datos.

## Requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd CustomerSystem
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura la base de datos**:
   - Crea una base de datos MySQL.
   - Importa el archivo `usuarios.sql` para crear las tablas necesarias:
     ```bash
     mysql -u root -p < usuarios.sql
     ```

4. **Configura las variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto y completa la configuración:
     ```plaintext
     PORT=4000
     MYSQL_HOST=localhost
     MYSQL_USER=root
     MYSQL_PASSWORD=<tu-contraseña>
     MYSQL_DB=usuarios
     ```

## Uso

Para ejecutar el servidor en modo de desarrollo, usa el siguiente comando:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:4000`.

## Scripts

- **`npm run dev`**: Ejecuta el servidor en modo de desarrollo usando Nodemon.

## Dependencias

- **express**: Framework web para Node.js.
- **bcrypt**: Librería para el cifrado de contraseñas.
- **express-myconnection**: Middleware para conectar con MySQL.
- **jsonwebtoken**: Manejo de autenticación basada en JSON Web Tokens (JWT).
- **morgan**: Logger de solicitudes HTTP.
- **mysql** y **mysql2**: Clientes MySQL para Node.js.

## Licencia

Este proyecto está bajo la licencia ISC.
