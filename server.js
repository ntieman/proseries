const express = require('express')

const app = express()

app.use('/', express.static('dist'))

app.listen(3000, () => {
  console.log('server ready at http://127.0.0.1:3000')
})
