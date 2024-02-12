class ApiResponse {
	statusCode: any;
	message: any;
	data: any;
	success: boolean;
	constructor(statusCode: any, data: any, message: any = 'Success') {
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
		this.success = statusCode < 400;
	}
}

export default ApiResponse;
