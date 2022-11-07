const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Service review server running')
})

app.listen(port, () => {
  console.log(`Service review server running on port ${port}`)
})