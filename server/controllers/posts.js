import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString })

    try {
        const result = await newPost.save()

        res.status(201).json({...result['_doc'], type: 'success', message: 'Post created successfully'})
    } catch (error) {
        res.status(409).json({type:'failed', message: 'Something went wrong ! '})
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({type: 'failed', message: 'Id is not exist'})

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new:true})

    res.json({...updatePost['_doc'], type: 'success', message: 'Post updated successfully'})
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({type: 'failed', message: 'Id is not exist'})

    await PostMessage.findByIdAndRemove(id)

    res.json({ type: 'success', message: 'Post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId) return res.json({ message: "Unauthorized action" })

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if(index == -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true})

    res.json(updatedPost)
}

export const commentPost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    const postDb = await PostMessage.findById(_id)
    let arr = postDb['comments']
    
    const comment = {...post['comments'], ownerId: req.userId }
    arr.push(comment)
    const finalPost = {...post, comments: arr}

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatePost = await PostMessage.findByIdAndUpdate(_id, finalPost, { new:true})

    res.json(updatePost)
}

export const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    const { key: key } = req.params;
    const post = req.body;

    let commentsFiltered = post['comments']
    if(key > -1) {
        commentsFiltered.splice(key, 1)
    }

    const finalPost = {...post, comments: commentsFiltered}

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatePost = await PostMessage.findByIdAndUpdate(_id, finalPost, { new:true})

    res.json(updatePost)

}