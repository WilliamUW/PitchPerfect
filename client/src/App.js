import React from "react"
import './App.css'

function App() {
  const [data, setData] = React.useState(null)
  const [prompt, setPrompt] = React.useState('')
  const [product, setProduct] = React.useState('Zephyrus G14')


  // Update prompt variable when handleChange is called
  const handleChange = (abc) => {
    setPrompt(abc.target.value)
  }

  // Update prompt variable when handleChange is called
  const handleChangeProduct = (abc) => {
    setProduct(abc.target.value)
  }

  const [product_traits, setProductTraits] = React.useState('Fast, good cooling, RGB, best in class performance, light, LED matrix')
  const handleChangeProductTraits = (abc) => {
    setProductTraits(abc.target.value)
  }

  const [seller, setSeller] = React.useState('Asus Sales Team')
  const handleChangeSeller = (abc) => {
    setSeller(abc.target.value)
  }

  const [client, setClient] = React.useState('Justin Chang, a second year Uoft CS student')
  const handleChangeClient = (abc) => {
    setClient(abc.target.value)
  }

  const [client_traits, setClientTraits] = React.useState('Plays cyberpunk, valorant, Uoft Student, high refresh rate display, loves battery life, performance, portability, AMD CPU, reasonable price')
  const handleChangeClientTraits = (abc) => {
    setClientTraits(abc.target.value)
  }

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data
  const handleSubmit = (abc) => {
    abc.preventDefault()
    setData(null)
    fetch(`/api?prompt=${prompt}&product=${product}&productTraits=${product_traits}&seller=${seller}&client=${client}&clientTraits=${client_traits}`)
      .then((res) => res.json())
      .then((data) => {
        // setData(`${data.generations[0].text.slice(0, -1).replace("<br/>", "<br/><br/>")}`);
        // setData(data.replace("\n", "\n\n"));
        // console.log("Data typw: " + typeof data);
        // console.log("Data text: " + data.generations[0].text);
        // console.log("Data tyoe text: " + typeof data.generations[0].text);
        // console.log("Data n: " + data.generations[0].text.replace("\n", "\n\n"));

        setData(data.generations[0].text.split('\n').map(str => <p>{str}</p>));
        data.text.split('\n').map(str => <p>{str}</p>)
      }
      )
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Personalized Sales Pitch Generator</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Who are you: <br />
            <textarea name="input-box" rows="5" cols="100" value={seller} onChange={handleChangeSeller} />
          </label>
          <br />
          <label>
            What do you want to sell: <br />
            <textarea name="input-box" rows="5" cols="100" value={product} onChange={handleChangeProduct} />
          </label>
          <br />
          <label>
            Product traits: <br />
            <textarea name="input-box" rows="5" cols="100" value={product_traits} onChange={handleChangeProductTraits} />
          </label>
          <br />

          <label>
            Who are you selling to: <br />
            <textarea name="input-box" rows="5" cols="100" value={client} onChange={handleChangeClient} />
          </label>
          <br />
          <label>
            Client traits: <br />
            <textarea name="input-box" rows="5" cols="100" value={client_traits} onChange={handleChangeClientTraits} />
          </label>

          <br />
          <input type="submit" value="Submit" />
        </form>
        <h1>Result:</h1>
        <div>{!data ? 'Loading' : data}</div>

        

        {/* <p>Feedback? <a href="mailto:elaine@cohere.com" className="App-link">Send me an email</a>. For errors please include a screenshot.</p>
        <p>Powered by <a href="https://cohere.ai/" className="App-link">Cohere</a></p> */}
      </header>
    </div>
  )
}


export default App
