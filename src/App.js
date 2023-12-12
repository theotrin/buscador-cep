import { FiSearch } from "react-icons/fi";
import {useState} from 'react'
import api from './services/api'
import './styles.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSerch(){
    
    if(input === ''){
      alert('campo de cep vazio, adcione algum para iniciar ser buscado')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)  
      setInput('') 

    } catch (error) {
      setInput('')
      alert('erro interno ao buscar')
    }

  }

  return (
    <div className="container">
     
     <h1 className="title">Buscador CEP</h1>

<div className="containterInput">
    <input 
    type="text"
    placeholder="Digite seu cep..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    ></input>
    <button className="buttonSearch" onClick={handleSerch}><FiSearch size={25} color='$FFF' /></button>
</div>

    {Object.keys(cep).length > 0 &&(
  <main className="main">

    <h2>CEP: {cep.cep}</h2>
    <span>Rua: {cep.logradouro} </span>
    <span>Bairro: {cep.bairro} </span>
    <span>Complemento: {cep.complemento}</span>
    <span>{cep.localidade} - {cep.uf} </span>

  </main>    
  )

    }
  

    </div>
  );
}

export default App;
