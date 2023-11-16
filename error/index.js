const customAPIError = require('./custom-errors')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')
const UnAuthenticationError = require('./unauthentication')


module.exports = {
    customAPIError,
    BadRequestError,
    NotFoundError,
    UnAuthenticationError
}