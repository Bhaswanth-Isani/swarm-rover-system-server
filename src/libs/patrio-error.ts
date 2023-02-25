/// Custom Error class for the server
export class PatrioError extends Error {
  statusCode = 400
  static typeToCode = {
    INVALID_DATA: 400,
    USER_ALREADY_EXISTS: 409,
    SERVER_ERROR: 500,
    INVALID_CREDENTIALS: 401,
    UNAUTHORIZED: 401
  }

  constructor (type: keyof typeof PatrioError.typeToCode) {
    // Sets the message of the error to the type of the current error
    super(type)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    // Sets the status code of the Error from the type
    this.statusCode = PatrioError.typeToCode[type]
    Error.captureStackTrace(this)
  }
}
