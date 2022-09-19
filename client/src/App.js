import React from "react"
import './App.css'

function App() {
  const [data, setData] = React.useState(null)
  // const [prompt, setPrompt] = React.useState('')
  const [product, setProduct] = React.useState('Zephyrus G14')

  // Update prompt variable when handleChange is called
  // const handleChange = (abc) => {
  //   setPrompt(abc.target.value)
  // }

  // Update prompt variable when handleChange is called
  const handleChangeProduct = (abc) => {
    setProduct(abc.target.value)
  }

  const [product_traits, setProductTraits] = React.useState('fast, good cooling, RGB, best in class performance, light, LED matrix')
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

  const [client_traits, setClientTraits] = React.useState('plays cyberpunk, valorant, Uoft Student, high refresh rate display, loves battery life, performance, portability, AMD CPU, reasonable price')
  const handleChangeClientTraits = (abc) => {
    setClientTraits(abc.target.value)
  }

  const [tokens, setTokens] = React.useState(150)
  const handleChangeTokens = (abc) => {
    setTokens(abc.target.value)
  }

  // When handleSubmit is called, passes prompt to /api and then gets assigns response to data
  const handleSubmit = (abc) => {
    abc.preventDefault()
    setData("Processing...")
    fetch(`/api?&product=${product}&productTraits=${product_traits}&seller=${seller}&client=${client}&clientTraits=${client_traits}&tokens=${tokens}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.generations[0].text.split('\n').map(str => <p>{str}</p>));
        data.text.split('\n').map(str => <p>{str}</p>)
      }
      )
      window.scroll({ bottom: 0, left: 0,  behavior: 'smooth' });
  }

  return (
    <div className="App" class="container-md text-white">
      <div class="main">
        <h1 class="mt-5">Personalized Sales Pitch Generator</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-group bg-dark text-white mt-3">
            <label > Who Are You: </label>
            <input type="text" class="form-control" name="input-box" value={seller} onChange={handleChangeSeller} />
            <br />
          </div>

          <div class="form-group bg-dark text-white mt-1">
            <label> What Do You Want To Sell: </label>
            <input type="text" class="form-control" name="input-box" value={product} onChange={handleChangeProduct} />
            <br />
          </div>

          <div class="form-group mt-1">
            <label>Product Keywords: </label>
            <input type="text" class="form-control" name="input-box" value={product_traits} onChange={handleChangeProductTraits} />
            <br />
          </div>

          <div class="form-group mt-1">
            <label>Who is the Client:</label>
            <input type="text" class="form-control" name="input-box" value={client} onChange={handleChangeClient} />
            <br />
          </div>

          <div class="form-group mt-1">
            <label> Client Keywords:</label>
            <input type="text" class="form-control" name="input-box" value={client_traits} onChange={handleChangeClientTraits} />
            <br />
          </div>

          <div class="form-group mt-1">
            <label> Length of Pitch (In Words):</label>
            <input type="number" class="form-control" name="input-box" value={tokens} onChange={handleChangeTokens} />
            <br />
          </div>

          <button type="submit" class="btn btn-info">Submit</button>
          <br />

        </form>
        <br />
        <h1 class="mt-3">Result:</h1>
        <p class="text-left mb-5">{!data ? 'Please enter a prompt' : data}</p>
      </div>
    </div>
  )
}


export default App
