import express from 'express'
const app = express()

// Preparación de ruta
const port = process.env.PORT || 3000

// Establecimiento del servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})