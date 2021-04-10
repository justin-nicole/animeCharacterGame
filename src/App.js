import './App.css';
import {useState, useEffect} from 'react';
import GameBox from './GameBox';

function App() {
  const [userInput, setUserInput] = useState('');
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({
  });
 
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


  useEffect(() =>{
    const getAnimeCharacters = () =>{
      const proxiedUrl = 'https://api.jikan.moe/v3/top/characters/'
      const url = new URL("https://proxy.hackeryou.com");
      
      url.search = new URLSearchParams({
          reqUrl: proxiedUrl
      })
      fetch(url)
      .then(res => res.json())
      .then((jsonResp) =>{
        const tempCharactersArray = jsonResp.top
        shuffleArray(tempCharactersArray);
        setAnimeCharacters(tempCharactersArray);
      })
    }
    getAnimeCharacters();
  }, [])


  useEffect(() =>{
    setCurrentCharacter(animeCharacters[1])
  }, [animeCharacters])
 
 
  return (
    <div className="App">
      <h1>ANIMEANIMEANIME</h1>

      {currentCharacter
      ?<GameBox image={currentCharacter.image_url} />
      :null
      }
      <form>
      <input type="text"></input>
      </form>
    </div>
    
  );
}

export default App;
