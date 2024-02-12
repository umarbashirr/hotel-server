import asyncHandler from '../utils/asyncHandler';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import ApiResponse from '../utils/apiResponse';

const RegisterUser = asyncHandler(async (req: any, res: any) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({
			statusCode: 400,
			success: false,
			data: null,
			message: 'Please provide a name, email, and password',
		});
	}

	const user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({
			statusCode: 400,
			success: false,
			data: null,
			message: 'User already exists',
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	if (!hashedPassword) {
		return res.status(500).json({
			statusCode: 500,
			success: false,
			data: null,
			message: 'Failed to hash password',
		});
	}

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});

	await newUser.save();

	return res.status(201).json(new ApiResponse(201, newUser, 'User created'));
});

export { RegisterUser };
