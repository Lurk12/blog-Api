const express = require('express')
const router = express.Router()

const allBlogs = require('../controllers/allBlogs')


router.get('/allBlogs', allBlogs)

module.exports = router