const express   = require('express')
const router    = express.Router()

const data      = require('../data/devMistakes.json')

router.get('/quote', (req, res) => {
  const quotes = data.slice(0) // Clone array so we don't modify it
  const quote  = randomQuote(quotes)

  res.json(quote)
})

router.get('/quote/not/:lastId', (req, res) => {
  const { lastId } = req.params

  // Clone array so we don't modify the original
  const quotes = data.slice()

  // Remove the lastId's element
  quotes.splice(lastId, 1)

  let quote = randomQuote(quotes)

  res.json(quote)
})

randomQuote = (quotes) => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  let   quote = quotes[randomIndex]

  return Object.assign(quote,
  {
    id: data.indexOf(quote)
  })
}
module.exports = router
