import { NextFunction, Response } from 'express';

const asyncHandler = (handler: any) => {
	return (req: any, res: Response, next: NextFunction) => {
		handler(req, res, next).catch(next);
	};
};

export default asyncHandler;
