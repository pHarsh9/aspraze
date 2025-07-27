const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')

const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('{*any}', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}


app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))