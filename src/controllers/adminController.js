const UserModel = require('../models/User')
const PostModel = require('../models/Post')

module.exports = {
    index: async (req, res) => {
        try {
            const users = await UserModel.find()

            if (!users) return res.status(400).send({ message: "There is not user" })

            return res.status(200).send({ users })

        } catch (error) {
            return res.status(400).send({ message: "Could not perform the users search", error })
        }
    },
    findOne: async (req, res) => {
        const { id } = req.params

        try {
            const user = await UserModel.findById(id)

            if (!user) return res.status(400).send({ message: "User not found" })

            return res.status(200).send({ user })

        } catch (error) {
            return res.status(400).send({ message: "Could not perform the users search", error })
        }
    },
    store: async (req, res) => {

        const { body } = req
        const { name, lastName, password, email} = body
        console.log(body)
        try {
            const user = await UserModel.create(body)

            user.password = undefined

            return res.status(200).send({ message: "User successfully created", data: user })

        } catch (error) {
            console.log(error)
            return res.status(400).send({ message: "It was not possible to add this user", error })
        }
    },
    delete: async (req, res) => {
        const { id } = req.params

        try {
            const user = await UserModel.findById(id)

            if (!user) return res.status(400).send({ message: "User not found" })

            await UserModel.deleteOne(user)

            return res.status(200).send({ message: "User successfully deleted" })

        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to delete this user", error })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { body } = req
        try {

            const user = await UserModel.findById(id)

            if (!user) return res.status(400).send({ message: "User not found" })

            for(prop in body){
                user[prop] = body[prop]
            }

            const saved = await UserModel.updateOne({_id:id}, user)

            return res.status(200).send({ message: "User successfully updated", saved })

        } catch (error) {
            return res.status(400).send({ message: "It was not possible update this user", error })
        }
    },
    indexPost: async (req, res) => {
        try {
            const posts = await PostModel.find().populate('user')

            if (!posts) return res.status(400).send({ message: "There is not publication" })

            return res.status(200).send({ posts })

        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to search publications", error })
        }
    },
    findOnePost: async (req, res) => {
        const { id } = req.params

        try {
            const post = await PostModel.findById(id).populate('user')

            if (!post) return res.status(400).send({ message: "Publication not found" })

            return res.status(200).send({ post })

        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to search this publication", error })
        }
    },
    storePost: async (req, res) => {
        const { body } = req

        try {
            const post = await PostModel.create({...body, user: req.userId})

            return res.status(200).send({ message: "Publication successfully created", data: post })

        } catch (error) {
            return res.status(400).send({ message: "It was not possible to add this publication", error })
        }
    },
    deletePost: async (req, res) => {
        const { id } = req.params
        try {
            const post = await PostModel.findById(id)

            if (!post) return res.status(400).send({ message: "Publication not found" })

            const deleted = await PostModel.deleteOne(post)

            return res.status(200).send({ message: "User successfully deleted"})
        } catch (error) {
            return res.status(400).send({ message: "It was not possibel to delete this publication", error })
        }
    },
    updatePost: async (req, res) => {
        const { id } = req.params
        const { body } = req

        try {
            const post = await PostModel.findById(id).populate('user')
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