const Blog = require('../model/blog')
const {StatusCodes} = require('http-status-codes')

const allUsersBlogs = async(req,res)=>{
    const blogs = await Blog.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({blogs,  count:blogs.length})
}

module.exports = allUsersBlogs