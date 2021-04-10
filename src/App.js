import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  // const [animeCharacters, setAnimeCharacters] = useState([]);
  let animeCharacters= [];
  const [currentCharacter, setCurrentCharacter] = useState({});
 
  const getAnimeCharacters = () =>{
    const proxiedUrl = 'https://api.jikan.moe/v3/top/characters/'
    const url = new URL("https://proxy.hackeryou.com");
    url.search = new URLSearchParams({
        reqUrl: proxiedUrl
    })
    fetch(url)
    .then(res => res.json())
    .then((jsonResp) =>{
      animeCharacters = jsonResp.top
      console.log(animeCharacters);
    })
  }

 
  getAnimeCharacters();

  

  return (
    <div className="App">
      <h1>ANIMEANIMEANIME</h1>
      <form>
      <input type="text"></input>
      </form>
    </div>
    
  );
}

export default App;
