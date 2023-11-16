const { BadRequestError } = require('../error')
const Blog = require('../model/blog')
const {StatusCodes} = require('http-status-codes')



const getAllBlogs = async (req, res)=>{
  const blog = await Blog.find({createdBy: req.user.userId}).sort('creaedAt')
    res.status(StatusCodes.OK).json({blog, count:blog.length})
}


const createBlogPost = async (req, res)=>{
    
    const {title,
         description,
          photoUrl,
           category,
           author,
            content } = req.body
            
     if (!title || 
                    !description ||
                    !photoUrl ||
                    !category ||
                    !author || 
                    !content
                    )
                    {
                        throw new BadRequestError('title, description, photoUrl, category, author, content are required!')
                    }
    
    
    req.body.createdBy = req.user.userId
    console.log(req.body.createdBy);

   const blog = await Blog.create({...req.body})
   console.log(blog);
    res.status(StatusCodes.CREATED).json({msg:'Blog created Sucessfully!', blog, count:blog.length})

}

const getBlogPost = async (req, res)=>{
    const {user:{userId}, 
    params:{id:blogId}} = req
    const blog = await Blog.findOne({_id: blogId, createdBy: userId})
    if(!blog){
        throw new BadRequestError(`No blog with id ${blogId}`)
    }
    res.status(StatusCodes.OK).json({blog})

}

const updateBlogPost = async (req, res)=>{
    const {
        body:{title, description, content},
        user:{userId}, 
    params:{id:blogId}} = req

    if(title === ''|| description === ''|| content === ''){
        throw new BadRequestError('title, description, content cannot be empty')
    }

    const blog = await Blog.findOneAndUpdate({
        _id:blogId,
         createdBy:userId},
         {title, description, content},
         {new:true, runValidators:true} 
         )

    if(!blog){
        throw new BadRequestError(`No blog with id ${blogId}`)
    }
    res.status(StatusCodes.OK).json({blog})
}

const deleteBlogPost = async (req, res)=>{
   const {user:{userId}, params:{id:blogId}}= req

    const blog = await Blog.findOneAndDelete({
        createdBy:userId,
        _id:blogId,
         
    })


    if(!blog){
        throw new BadRequestError(`No blog with id ${blogId}`)
    }
    res.status(StatusCodes.OK).json({msg: `Blog with ID ${blogId} has been Deleted Successfully!`})
}

module.exports = {
    getAllBlogs,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost
}