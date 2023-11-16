const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authentication')


const { getAllBlogs,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost} = require('../controllers/blog'
    )

router.post('/blogs', authenticateUser, createBlogPost)
router.get('/blogs', authenticateUser, getAllBlogs)
router.get('/blogs/:id', authenticateUser, getBlogPost)
router.patch('/blogs/:id', authenticateUser, updateBlogPost)
router.delete('/blogs/:id', authenticateUser, deleteBlogPost)
// router.route('/blogs').get(getAllBlogs).post(createBlogPost)
// router.route('/blogs/:id', authenticateUser).get(getBlogPost).patch(updateBlogPost).delete(deleteBlogPost)

module.exports = router