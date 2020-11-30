const express = require("express")
const router = express.Router()

const auth = require('../middlewares/auth')
const adminController = require('../controllers/adminController')

router.use(auth)

router.post("/add", adminController.store)
router.post("/post/add", adminController.storePost)
router.get("/post", adminController.indexPost)
router.get('/', adminController.index)
router.get('/:id', adminController.findOne)
router.get("/post/:id", adminController.findOnePost)
router.put('/update/:id', adminController.update)
router.put("/post/update/:id", adminController.updatePost)
router.delete('/delete/:id', adminController.delete)
router.delete("/post/delete/:id", adminController.deletePost)




module.exports = router