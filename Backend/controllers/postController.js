const Post = require('../models/postModel')
const mongoose = require('mongoose')
const { json } = require('express')
const multer = require('multer')
const upload = multer()

// GET all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})

    res.status(200).json(posts)
}


// GET a single post
const getPost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Post not found"})
    }

    const post = await Post.findById(id)

    if (!Post) {
        return res.status(404).json({error: 'Post not found'})
    }
    res.status(200).json(post)
}

// POST a new post
const createPost = async (req, res) => {

    const {title, description, location, review} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!req.file) {
        emptyFields.push('image')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (!review) {
        emptyFields.push('review')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields})
    }

    // add doc to db
    const selectedImage = '/files/uploaded-photos/' + req.file.filename;

    try {
        const post = await Post.create({title, selectedImage, description, location, review})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// DELETE a post
const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Post not found"})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if (!Post) {
        return res.status(400).json({error: 'Post not found'})
    }

    res.status(200).json(post)
}


// UPDATE a post
const updatePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Post not found"})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!Post) {
        return res.status(400).json({error: 'Post not found'})
    }

    res.status(200).json(post)
}



module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}