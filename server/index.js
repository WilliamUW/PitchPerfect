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
  const prompt = 'Command: Write a sales pitch email from Asus Sales Team to Justin who Plays cyberpunk, valorant, Uoft Student, high refresh rate display, loves battery life, performance, portability, AMD CPU, reasonable price regarding why he must buy the new Zephyrus G14 which is Fast, good cooling, RGB, best in class performance, light, LED matrix. \nSales Email:'
  // const prompt = `Command: Write a sales pitch for ${req.query.prompt}` || "This is a default article because you did not enter anything"
  const response = await cohere.generate('xlarge', {
    prompt: prompt,
    max_tokens: 250,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0, 
    presence_penalty: 0, 
    stop_sequences: ['--'],
    return_likelihoods: 'NONE' 
  })
  console.log(response)
  console.log(response.body.generations)
  response.body.prompt = prompt

  // to do ignore eveyrthing after last period

  res.json(response.body)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
