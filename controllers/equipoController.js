const fs = require('fs/promises')
const path = require('path')

// Función para obtener el equipo desde el JSON
const obtenerEquipo = async (req, res) => {
  try {
    // Definimos la ruta del JSON una sola vez fuera para no repetir código
    const ruta = path.join(__dirname, '../data/equipo.json')
    // Leemos el archivo JSON y lo parseamos
    const data = await fs.readFile(ruta, 'utf-8')
    // Respondemos con los datos del equipo encontrado
    const equipo = JSON.parse(data)

    return res.status(200).json(equipo)
  } catch (error) {
    console.error(error)
    // En caso de error, respondemos con un 500 y un mensaje de error
    return res.status(500).json({
      msg: 'Error al obtener equipo'
    })
  }
}
// Exportamos la función para que pueda ser usada en las rutas
module.exports = {
  obtenerEquipo
}