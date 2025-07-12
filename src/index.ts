// Arranque de proyecto
// Dependencias
import colors from 'colors';
// Archivos
import server from './server';

// Preparación de ruta
const port = process.env.PORT || 3000;

// Establecimiento del servidor
server.listen(port, () => {
    console.log(colors.cyan.italic(`Servidor escuchando en el puerto: ${port}`));
})