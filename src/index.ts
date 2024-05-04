import express from 'express'
import routerUsers from './routes/users'
import routerPosts from './routes/posts'

const app = express()
const PORT = 3000

// Content-Type - application/json
app.use(express.json())
// Content-Type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/users', routerUsers)
app.use('/posts', routerPosts)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
