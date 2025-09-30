const express = require('express')
const cors = require('cors')
const nanoid = require('nanoid')
const app = express()
const port = 3001

const transactions = []

app.use(cors())
app.use(express.json())
app.get('/transactions', (req, res) => {
  res.json(transactions)
})

app.post('/transactions', (req, res) => {
  const transaction = req.body
  console.log(transaction)
  if(transaction) {
    transactions.push({id: nanoid(), ...transaction})
  }
  res.json(transaction)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
