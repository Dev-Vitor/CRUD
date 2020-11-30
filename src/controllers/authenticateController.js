const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const generateTokenAdmin = require('../utils/generateTokenAdmin')

module.exports = {
    store: async (req, res) => {
        const { body } = req

        try {
            const user = await UserModel.create(body)

            user.password = undefined

            res.status(200).send({
                message: "User succesfully created",
                data: user,
                token: generateToken({ id: user.id })
             })

        } catch (error) {
            res.status(401).send({ message: "User not created", error })
        }
    },
    auth: async (req, res) => {
        const { email, password } = req.body

        try {

            const user = await UserModel.findOne({ email }).select('+password')
            if (!user) {
                return res.status(401).send({ message: "User not found" })

            }
            if(user.admin){

                user.password = undefined

                return res.status(200).send({ user, token: generateTokenAdmin({ id: user.id }) })
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(401).send({ message: "Invalid password" })
            }

            user.password = undefined

            return res.status(200).send({ user, token: generateToken({ id: user.id }) })

        } catch (error) {
            res.status(401).send({ message: "Login failed", error })
        }

    }
}