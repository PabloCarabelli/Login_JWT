import express from 'express';
import morgan from 'morgan';
import productsRoutes from "./routes/products.routes";
import authRoutes from './routes/auth.route';
import userRoutes from "./routes/user.routes";
import { createRoles } from './libs/initialSetup'

const app = express();
createRoles();

//para poder ver en consola las peticiones web.
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Bienvenido esto va a ser un sistema adaptable de pedidos de la calle al sistema central ERP')
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;