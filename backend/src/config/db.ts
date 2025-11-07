// Dependencias
import colors from 'colors';
import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.italic(`Conexión con MongoDB en ${url}`))
    } catch (error) {
        console.error(colors.red.bold(error.message));
    }
}