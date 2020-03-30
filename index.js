const express = require('express')
const locationRoute = require('./src/location')
const authRoute = require('./src/auth')
const commandRoute = require('./src/command')
const ocrRoute = require('./src/ocr')
const chatRoute = require('./src/chat')
const chatroomRoute = require('./src/chatroom')
const abtestRoute = require('./src/abtest')
const imggen = require('./src/imagegen')
const app = express()
const assetExercise = require('./src/assetExercise')

app.set('trust proxy', true)
app.use(express.static('public'))
app.use(express.json({ limit: '50mb' }))

app.use('/assetExercise', assetExercise)
app.use('/location', locationRoute)
app.use('/auth', authRoute)
app.use('/commands', commandRoute)
app.use('/ocr', ocrRoute)
app.use('/chat', chatRoute)
app.use('/chatroom', chatroomRoute)
app.use('/imggen', imggen)
app.use('/abtest', abtestRoute)

const requests = []
app.get('/jsFile', (req, res) => {
  res.json({
    total: requests.length, requests
  })
})
app.get('/jsFile.js', (req, res) => {
  const date = new Date()
  requests.unshift({
    method: req.method,
    time: date.toTimeString()
  })
  res.set('Cache-Control', 'max-age=5')
  res.send('console.log(\'hello zach\')')
})

app.listen(process.env.PORT || 3020)
