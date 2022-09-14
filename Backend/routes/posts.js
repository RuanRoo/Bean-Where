const express = require('express')
const Post = require('../models/postModel')
const {
    createPost,
    getPost,
    getPosts,
    deletePost,
    updatePost

} = require('../controllers/postController')

const requireAuth = require('../middleware/requireAuth')
const multer = require("multer");

const router = express.Router()

// require auth for all post routes
router.use(requireAuth)

// GET all posts
router.get('/', getPosts)

// GET a single post
router.get('/:id', getPost)

// POST a new post
// Image posted using Multer 

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../frontend/files/uploaded-photos');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({storage: storage});

router.post('/', upload.single('image'), createPost)

// DELETE a post
router.delete('/:id', deletePost)

// UPDATE a post
router.patch('/:id', updatePost)

module.exports = router