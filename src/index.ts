require('dotenv').config();

import { app } from './app';
import { connect } from './db';

const PORT = process.env.PORT || 4000;

connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB', error);
	});
