const notFoundMiddleware = (req, res)=>{
    res.status(400).json({msg: 'Route does not Exist'})
}


module.exports = notFoundMiddleware