const router = require('express').Router()
const User = require('../model/userModel')
const Post = require('../model/postModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../middleware/verify')

router.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        const isPwdMatch = await bcrypt.compare(password, user.password)
        if (isPwdMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' })
            res.status(200).json({ token: token })
        } else {
            res.status(400).json({ msg: "Password Does Not Match" })
        }
    } else {
        res.status(404).json({ msg: "User Not Found" })
    }
})

router.get('/api/verify', verify, (req, res) => {
    res.status(200).json({ msg: "Verified" })
})

router.post('/api/admin/dashboard', verify, async (req, res) => {
    try {
        const { title, blog, category, author } = req.body
        const post = await Post.create({
            title, blog, category, author
        })
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({ msg: "Failed" })
    }
})

router.get('/api/blogs', async (req, res) => {
    try {
        const post = await Post.find().sort({ title: -1 })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ msg: "Failed To Fetch Posts" })
    }
})

router.get('/api/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findOne({_id:id})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ msg: "Failed To Fetch Posts" })
    }
})

router.delete('/api/blogs/:id', verify, async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findByIdAndDelete({ _id: id })
        if (post) {
            res.status(200).json({ msg: "Deleted" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Delete Post" })
    }
})

router.put('/api/admin/dashboard/edit/:id', verify, async (req, res) => {
    try {
        const { title, blog, category, author } = req.body
        const id = req.params.id
        const post = await Post.findOneAndUpdate({ _id: id }, { title, blog, category, author })
        if (post) {
            res.status(200).json({ msg: "Updated" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Update Post" })
    }
})

router.get('/api/admin/dashboard/edit/:id', verify, async (req, res) => {
    try {
        const id = req.params.id
        const post = await Post.findById({ _id: id })
        if (post) {
            res.status(200).json(post)
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed To Fetch" })
    }
})

module.exports = router