const fs = require('fs').promises;
const path = require('path');

const registrarUsuario = async(req, res) => {

    try {

        //Datos que manda el front
        const {email, password, nombre} = req.body;

        //rutas de los json
        const rutaUsuarios = path.join(__dirname, "../data/usuarios.json");
        

        //Leo usuarios
        const datoUsuarios = await fs.readFile(rutaUsuarios, "utf8");
        //Convierto a JSON
        const usuarios = JSON.parse(datoUsuarios);

        //Genero el ID 
        let nuevoID;

        if(usuarios.length > 0){
            const ultimoUsuario = usuarios[usuarios.length - 1];
            nuevoID = ultimoUsuario.id + 1;
        }else{
            nuevoID = 1;
        }

        //Creo el usuario
        const nuevoUsuario = {
            id: nuevoID,
            email,
            password,
            nombre
        };

        //Guardo usuario
        usuarios.push(nuevoUsuario);

        console.log(nuevoUsuario);
        console.log("Push realizado con éxito. Lista de usuarios actualizada:");
        console.table(usuarios); // console.table queda muy bien para ver arrays de objetos

        await fs.writeFile(
            rutaUsuarios,
            JSON.stringify(usuarios, null, 2)
        );

        console.log(path.dirname(__dirname));

        //flag
        res.status(201).json({
            msg: 'Usuario registrado correctamente'
        });
    }catch(error){
        res.status(500).json({
            error: 'Error al registrar el usuario'
        });
    }
} 

module.exports = {
    registrarUsuario
};