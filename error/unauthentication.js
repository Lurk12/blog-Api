const CustomAPIError = require('./custom-errors')

class UnAuthnticationError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

module.exports = UnAuthnticationError