const { BadRequestError } = require('../error')
const {NotFoundError} = require('../error')
const Blog = require('../model/blog')
const {StatusCodes} = require('http-status-codes')



const getAllBlogs = async (req, res)=>{
  const blog = await Blog.find({createdBy: req.user.userId}).sort({ createdAt: -1 }).populate('comments')
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
   

   const blog = await Blog.create({...req.body})
   console.log(blog);
    res.status(StatusCodes.CREATED).json({msg:'Blog created Sucessfully!', blog, count:blog.length})

}
const getBlogPost = async (req, res) => {
    try {
        const {id:blogId} = req.params
        const blog = await Blog.findOne({_id:blogId}).populate({
            path: 'comments',
            populate: {
                path: 'createdBy',  // Replace 'user' with the actual path to the user field in your comment schema
            },
        });
        if (!blog){
            return res.status(StatusCodes.NOT_FOUND).json({ error: `No blog with id: ${blogId}` });
        
        }
        res.status(StatusCodes.OK).json(blog)

     
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve the blog post.' });
    }
};


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
        throw new NotFoundError(`No blog with id ${blogId}`)
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
        throw new NotFoundError(`No blog with id ${blogId}`)
    }
    res.status(StatusCodes.OK).json({msg: `Blog with ID ${blogId} has been Deleted Successfully!`})
}



module.exports = {
    getAllBlogs,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost,
}

