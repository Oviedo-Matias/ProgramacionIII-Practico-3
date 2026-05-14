const fs = require('fs').promises;
const path = require('path');

const getServicios = async (req, res) => {
  try {
    // Leemos el archivo JSON de servicios y lo parseamos
    const pathArchivo = path.join(__dirname, '../data/servicios.json');
    const data = await fs.readFile(pathArchivo, 'utf8');
    const servicios = JSON.parse(data);

    // Respondemos con la lista de servicios
    return res.status(200).json(servicios);
  } catch (error) {
    // En caso de error, respondemos con un 500 y un mensaje de error
    console.log(error);
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los servicios' });
  }
}
// Función para obtener un servicio por ID
const getServiciosById = async (req, res) => {
  try {
    // Leemos el archivo JSON de servicios y lo parseamos
    const pathArchivo = path.join(__dirname, '../data/servicios.json');
    const dataServicios = await fs.readFile(pathArchivo, 'utf8');
    const servicios = JSON.parse(dataServicios);
    const dataDetalle = await fs.readFile('./data/serviciosDetalle.json', 'utf8')
    const serviciosDetalle = JSON.parse(dataDetalle)
    // Obtenemos el ID de los parámetros de la ruta y buscamos el servicio correspondiente
    const { id } = req.params;
    const servicioId = servicios.find((s) => s.id === parseInt(id));
    // Si no encontramos el servicio, respondemos con un 404
    if (!servicioId) {
      return res.status(404).json({ msg: `No existe el servicio con id ${id}` });
    }

    // Buscamos el detalle del servicio por ID    const detalleServicio = serviciosDetalle.find((d) => d.id === parseInt(id));
    // Si no encontramos el detalle, respondemos con un 404
    if (!detalleServicio) {
      return res.status(404).json({ msg: `No existe el detalle del servicio con id ${id}` });
    }
    //Respondemos con los datos del servicio encontrado (podríamos omitir información sensible si fuera necesario)
    return res.status(200).json(servicioId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: `No se pudo obtener el detalle del servicio del id n° ${id}`
    });
  }
}
// Exportamos ambas funciones para que puedan ser usadas en las rutas
module.exports = { getServicios, getServiciosById };