const express = require('express')
const locationRoute = require('./src/location')
const authRoute = require('./src/auth')
const commandRoute = require('./src/command')
const ocrRoute = require('./src/ocr')
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

app.listen(process.env.PORT || 3020)
