const CustomAPIError = require('./custom-errors')

class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}

module.exports = NotFoundError