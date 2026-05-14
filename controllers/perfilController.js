const fs = require('fs/promises');
const path = require('path');

// Definimos la ruta del JSON una sola vez fuera para no repetir código
const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');

// Función para obtener perfil por ID
const getPerfilById = async (req, res) => {
    try {
        // Leemos el archivo JSON y lo parseamos
        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);

        // Obtenemos el ID de los parámetros de la ruta
        const { id } = req.params;
        // Buscamos el usuario por ID (parseamos el ID a entero porque en el JSON se guarda como número)
        const usuarioEncontrado = usuarios.find(u => u.id === parseInt(id));
        // Si no encontramos el usuario, respondemos con un 404
        if (!usuarioEncontrado) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        // Respondemos con los datos del usuario encontrado (podríamos omitir la contraseña por seguridad)
        const { password, ...datosPublicos } = usuarioEncontrado; // Esto omite la contraseña
        res.status(200).json(datosPublicos);
    } catch (error) {
        // En caso de error, respondemos con un 500 y un mensaje de error
        console.log("Error en el back de perfil: ", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

// Función para obtener perfil por email
const obtenerPerfilPorEmail = async (req, res) => {
    try {
        // Obtenemos el email de los parámetros de la ruta
        const { email } = req.params;
        // Leemos el archivo JSON y lo parseamos
        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        const usuarios = JSON.parse(data);

        // Buscamos por email (el que guardaste en el localStorage)
        const usuarioEncontrado = usuarios.find(u => u.email === email);
        // Si no encontramos el usuario, respondemos con un 404
        if (!usuarioEncontrado) {
            return res.status(404).json({ msg: "Usuario no encontrado por email" });
        }
        // Respondemos con los datos del usuario encontrado (omitiendo la contraseña)
        const { password, ...datosPublicos } = usuarioEncontrado;// Esto omite la contraseña
        res.status(200).json(datosPublicos);
    } catch (error) {
        console.log("Error en obtenerPerfilPorEmail: ", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};
// Exportamos ambas funciones para que puedan ser usadas en las rutas
module.exports = { getPerfilById, obtenerPerfilPorEmail };
