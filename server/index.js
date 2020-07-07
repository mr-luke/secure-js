const express = require('express')

function isEmptyString (value) {
  return value === null || value.length === 0
}

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE')
  next()
})

app.post('/form', (req, res) => {
  const payload = req.body

  let values = Object.values(payload).filter(item => item !== null)

  if (values.length === 0) {
    res.status(500).json({message: 'An error occured.'})
    return
  }

  if (!isEmptyString(payload.email) && payload.email.includes('@example')) {
    res.status(400).json({message: 'No temporary data allowed'})
    return
  }

  if (isEmptyString(payload.email)) {
    res.status(422).json({
      message: 'Invalid data given.',
      errors: { email: 'E-mail is required & cannot be empty.' }
    })
    return
  }

  if (isEmptyString(payload.firstName)) {
    res.status(422).json({
      message: 'Invalid data given.',
      errors: { firstName: 'First name is required & cannot be empty.' }
    })
    return
  }

  if (isEmptyString(payload.lastName)) {
    res.status(422).json({
      message: 'Invalid data given.',
      errors: { lastName: 'Last name is required & cannot be empty.' }
    })
    return
  }

  if (payload.about === null) {
    res.status(500).json({message: 'An error occured.'})
    return
  }

  if (!isEmptyString(payload.about) && payload.about.length > 50) {
    res.status(409).json({message: 'Conflict'})
    return
  }

  res.status(200).json({message: 'Application sent.'})
})

const server = app.listen(8080, '0.0.0.0')
server.on('listening', () => {
  console.log('Server listening on 0.0.0.0:8080')
})
