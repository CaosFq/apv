import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const url = `${mongoose.connection.host}:${mongoose.connection.port}`;
        console.log(`Conectado a MongoDB en ${url}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default conectarDB;
