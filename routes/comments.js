const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')


const { updateComments, deleteComment, createComment} = require('../controllers/comments')

router.post('/blog/create-comment/:blogId', authenticateUser, createComment)
router.patch('/blog/update-comment/:id', authenticateUser, updateComments)
router.delete('/blog/delete-comment/:id', authenticateUser, deleteComment)




module.exports = router
