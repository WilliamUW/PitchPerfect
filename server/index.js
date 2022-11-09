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
  console.log(req.query)
  const intro = `Hello ${req.query.client}, \nI am here to tell you why ${req.query.product} is the product for you!`;
  const prompt = `Command: Write a sales pitch email from ${req.query.seller} to ${req.query.client} who ${req.query.clientTraits} regarding why ${req.query.client} must buy the new ${req.query.product} which is ${req.query.productTraits} \nSales Email: Hello ${req.query.client}, \n` + intro;
  // const prompt = `Command: Write a sales pitch for ${req.query.prompt}` || "This is a default article because you did not enter anything"
  console.log("Prompt: " + prompt);
  let tokensNum = parseInt(`${req.query.tokens}`) || 150
  const response = await cohere.generate('xlarge', {
    prompt: prompt,
    max_tokens: tokensNum,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE'
  })
  response.body.generations[0].text = `Hello ${req.query.client}, \nI am here to tell you why you should buy ${req.query.product}.` + response.body.generations[0].text
  console.log("response", response)
  console.log("response.body", response.body)
  console.log("response.body.generations", response.body.generations)
  //response.body.prompt += `Hello ${req.query.client}, \nI am here to tell you why you should buy ${req.query.product}.`;
  //response.body.prompt += prompt;

  // to do ignore eveyrthing after last period
  res.json(response.body)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
