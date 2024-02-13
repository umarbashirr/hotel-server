import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

import { AuthRoutes } from './routes/auth.routes';

app.use('/api/v1/auth', AuthRoutes);

app.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Hello from Express! 🎉',
	});
});

export { app };
