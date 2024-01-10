const Comment = require('../model/comments')
const Blog = require('../model/blog')
const {BadRequestError, NotFoundError} = require('../error')
const {StatusCodes} = require('http-status-codes')


const createComment = async (req, res) => {
    const { user: { userId }, params:{blogId},body: { comment } } = req;

    try {
        const blog = await Blog.findById({_id:blogId});
if (!blog){
    throw new NotFoundError({msg:'Blog not found'})
}

        const newCommentContent = comment 
       const newComment = await Comment.create({comment: newCommentContent, createdBy: userId})

      
        blog.comments.push(newComment._id, newComment.createdBy)
        await blog.save()

       res.status(StatusCodes.CREATED).json({newComment})
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to add the comment.' });
    }
};




const updateComments = async(req, res)=>{
    try {
        const {params: {id:commentId},
    body:{name, comment}}= req
    
    if (!name || !comment) {
        throw new BadRequestError('Name and Comments are required!');
      }

    const newComment = await Comment.findOneAndUpdate({_id:commentId},
        {name:name, comment:comment},
        {new:true, runValidators: true})
        if(!newComment){
            throw new BadRequestError (`No comment with id ${commentId}`)
        }
        res.status(StatusCodes.OK).json({success:true, comment: newComment})
    } catch (error) {
        console.log(error)
    }

}

const deleteComment = async(req, res)=>{
    const {id:commentId} = req.params

    const deletedComment = await Comment.findOneAndDelete({_id:commentId})
    if(!deletedComment){
        throw new BadRequestError(`No comment with id: ${commentId}`)
    }    
    res.status(StatusCodes.OK).json({success:true, msg:'Comment deleted successfully!'})
}

module.exports = {createComment, updateComments, deleteComment}