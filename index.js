require('dotenv').config()
const http = require("http")
const mongoose = require('mongoose')

const app = require('./src/app')

const PORT = process.env.PORT || 3333
const MONGOURL = process.env.MONGO_URL

const server = http.createServer(app)

app.listen(PORT, ()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "Not connected in MongoDB"))
db.once('open', () => console.log('Connected in MongoDB'))