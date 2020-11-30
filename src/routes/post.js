const express = require("express")
const router = express.Router()

const auth = require('../middlewares/auth')
const postController = require('../controllers/postController')

router.get('/', postController.index)

router.use(auth)

router.post('/add', postController.store)
router.post('/:id', postController.findOne)
router.put('/update/:id', postController.update)
router.delete('/delete/:id', postController.delete)

module.exports = router