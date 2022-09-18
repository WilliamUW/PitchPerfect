// server/index.js
const path = require('path')
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()
const cohere = require('cohere-ai')
cohere.init('7IN1T5Cs4N8yEcmwTFmszm1KoXphGbZQrrTXKNZo', '2021-11-08')

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", async (req, res) => {
  console.log("get api call")
  const prompt = `${req.query.prompt}` || "This is a default article because you did not enter anything"
  const response = await cohere.generate('xlarge', {
    prompt,
    max_tokens: 50,
    temperature: 0.5,
    k: 0,
    p: 0.75,
    stop_sequences: ['-']
  })
  console.log(response)
  response.body.prompt = prompt
  res.json(response.body)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
