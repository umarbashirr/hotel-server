import express from 'express';

const app = express();

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
