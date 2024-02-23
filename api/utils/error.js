
// This is to handle custom (pre-defined) error messages, generated by us. 
export const errorHandler = (statusCode, message) => {
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message;
    return error;
};