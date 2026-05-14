const fs = require('fs');
const path = require('path');

// Función para manejar el login
const login = (req, res) => {
    // Obtenemos el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;
    
    const usuariosPath = path.join(__dirname, '../data/usuarios.json');
    // Leemos el archivo JSON
    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));

    // Buscamos si existe el usuario y coincide la contraseña
    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);
    // Si encontramos un usuario válido, respondemos con un mensaje de éxito y el nombre del usuario, de lo contrario respondemos con un mensaje de error
    if (usuarioValido) {
        return res.status(200).json({ 
            msg: "Correcto", 
            usuario: usuarioValido.nombre 
        });
    } else {
        return res.status(401).json({ 
            msg: "Incorrecto" 
        });
    }
};
// Exportamos la función para que pueda ser usada en las rutas
module.exports = { login };
