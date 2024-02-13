const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const apiRouter = require("./routes/api.js")

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(apiRouter)

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;