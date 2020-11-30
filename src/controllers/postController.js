const PostModel = require('../models/Post')

module.exports = {
    index: async (req, res) => {
        try {
            const posts = await PostModel.find().populate('user')

            if (!posts) return res.status(400).send({ message: "There is not publication" })

            return res.status(200).send({ posts })

        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to search publications", error })
        }
    },
    findOne: async (req, res) => {
        const { id } = req.params

        try {
            const post = await PostModel.findById(id).populate('user')

            if (!post) return res.status(400).send({ message: "Publication not found" })

            return res.status(200).send({ post })

        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to search this publication", error })
        }
    },
    store: async (req, res) => {
        const { body } = req

        try {
            const post = await PostModel.create({...body, user: req.userId})

            return res.status(200).send({ message: "Publication successfully created", data: post })

        } catch (error) {
            return res.status(400).send({ message: "It was not possible to add this publication", error })
        }
    },
    delete: async (req, res) => {
        const { id } = req.params
        try {
            const post = await PostModel.findById(id)
            const myPost = await PostModel.findById(id)

            if(myPost.user != req.userId) return res.status(401).send({ 
                message: "You cannot delete someone else's post"
             })

            if (!post) return res.status(400).send({ message: "Publication not found" })

            const deleted = await PostModel.deleteOne(post)

            return res.status(200).send({ message: "User successfully deleted"})
        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to delete this publication", error })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { body } = req

        try {
            const post = await PostModel.findById(id).populate('user')
            const myPost = await PostModel.findById(id)

            if(myPost.user != req.userId) return res.status(401).send({ 
                message: "You cannot update someone else's post"
             })

            if (!post) return res.status(400).send({ message: "Publication not found" })

            for (prop in body) {
                post[prop] = body[prop] 
            }

            await PostModel.findByIdAndUpdate({ _id: id }, post)

            return  res.status(200).send({ message: "Publication successfully updated"})

        } catch (error) {
            return res.status(400).send({ message: "It was not possible update this publication", error })
        }
    },
}