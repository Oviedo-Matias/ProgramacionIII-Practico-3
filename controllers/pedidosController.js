const crearPedido = async (req, res) => {
    try {
        const nuevoPedidoInfo = req.body;
        
        const data = await fs.readFile(rutaUsuarios, 'utf-8');
        let usuarios = JSON.parse(data);

        const index = usuarios.findIndex(u => u.email === nuevoPedidoInfo.usuarioEmail);

        if (index !== -1) {
            // Mapeo de value del select, nombre para mostrar y nombre de la imagen
            const infoServicios = {
                "web": { nombre: "Desarrollo Web", img: "img_desarrollo_web.jpg" },
                "mobile": { nombre: "Desarrollo Movil", img: "img_desarrollo_mobile.jpg" },
                "cloud": { nombre: "Soluciones Cloud", img: "img_soluciones_cloud.jpg" },
                "software-a-medida": { nombre: "Software a Medida", img: "img_software.jpg" },
                "bd": { nombre: "Bases de Datos", img: "img_database.jpg" },
                "seguridad": { nombre: "Seguridad y Auditorias", img: "img_seguridad_auditorias.jpg" }
            };
            // Si el servicio no está en el mapeo, usamos un valor por defecto
            const servicioElegido = infoServicios[nuevoPedidoInfo.servicio] || { nombre: nuevoPedidoInfo.servicio, img: "img_software.jpg" };
            // Creamos el nuevo pedido con la información del servicio elegido
            const nuevoPedido = {
                titulo: servicioElegido.nombre,
                imagen: `../assets/img/servicios_img/${servicioElegido.img}`,
                estado: "Pendiente de revisión"
            };
            // Agregamos el nuevo pedido al usuario correspondiente
            usuarios[index].pedidos.push(nuevoPedido);
            // Guardamos los cambios en el JSON
            await fs.writeFile(rutaUsuarios, JSON.stringify(usuarios, null, 2));
            // Respondemos con un mensaje de éxito y el nuevo pedido creado
            res.status(201).json({ msg: "Pedido creado correctamente", pedido: nuevoPedido });
        } else {
            res.status(404).json({ msg: "Usuario no encontrado" });
        }

    } catch (error) {
        console.error("Error al procesar pedido:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};