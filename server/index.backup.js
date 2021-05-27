import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//Routes List
import postRoutes from './routes/posts.js'

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()

// Prefix Routes
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));


const uri = process.env.CONNECTION_URL

mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)


app.get('/', (req, res) => {
    res.send('Hello to My API')
})


app.use('/posts', postRoutes)