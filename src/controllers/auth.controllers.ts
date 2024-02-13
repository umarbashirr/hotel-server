import asyncHandler from '../utils/asyncHandler';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import ApiResponse from '../utils/apiResponse';
import jwt from 'jsonwebtoken';

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

const LoginUser = asyncHandler(async (req: any, res: any) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			statusCode: 400,
			success: false,
			data: null,
			message: 'Please provide an email and password',
		});
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).json({
			statusCode: 404,
			success: false,
			data: null,
			message: 'User not found',
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(401).json({
			statusCode: 401,
			success: false,
			data: null,
			message: 'Invalid credentials',
		});
	}

	const payload = {
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		},
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: '1d',
	});

	if (!token) {
		return res.status(500).json({
			statusCode: 500,
			success: false,
			data: null,
			message: 'Failed to generate token',
		});
	}

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
		maxAge: 24 * 60 * 60 * 1000,
	});

	return res.status(200).json({
		statusCode: 200,
		success: true,
		data: { token, user: payload.user },
		message: 'User logged in',
	});
});

export { RegisterUser, LoginUser };
