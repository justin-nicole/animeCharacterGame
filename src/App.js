import './App.css';
import {useState, useEffect} from 'react';
import GameBox from './GameBox';
import LandingPage from './LandingPage.js';
import StartButton from './StartButton.js';
import Timer from './Timer.js';
import Score from './Score.js';
import UserInput from './UserInput.js';
import Footer from './Footer.js';
import CharacterImage from './CharacterImage';
import CharacterTransition from './CharacterTransition';

function App() {
  //state variable to track user input
  const [userInput, setUserInput] = useState('');
  //state variable to store an array of anime characters from api
  const [animeCharacters, setAnimeCharacters] = useState([]);
  //state variable to hold information about current character that user must guess
  const [currentCharacter, setCurrentCharacter] = useState({
    title: ''
  });
  //state variable to hold character name
  const [currentCharacterName, setCurrentCharacterName]= useState('');
  //state variable to hold boolean for determining if guess is correct
  const [correctGuess, setCorrectGuess]= useState ('false');
  const [characterNumber, setCharacterNumber] = useState(0);
  //state variable to hold score information
  const [score, setScore] = useState(0);
  const [transitionCharacter, setTransitionCharacter] = useState({})
  const [transitionClass, setTransitionClass] = useState(false)
  
 
  //function to randomize array of characters from api
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//get data from api when app mounts
  useEffect(() =>{
    const getAnimeCharacters = () =>{
      //use proxy server to bypass CORS error
      const proxiedUrl = 'https://api.jikan.moe/v3/top/characters/'
      const url = new URL("https://proxy.hackeryou.com");
      
      url.search = new URLSearchParams({
          reqUrl: proxiedUrl
      })
      fetch(url)
      .then(res => res.json())
      .then((jsonResp) =>{
        //store data in temp array
        const tempCharactersArray = jsonResp.top
        //shuffle temp array
        shuffleArray(tempCharactersArray);
        //assign shuffled array to stateful variable 
        setAnimeCharacters(tempCharactersArray);
      })
    }
    getAnimeCharacters();
  }, [])

  //when animecharacters array value is updated (triggering app function to run again), set currentCharacter as the 1st character of the array
  useEffect(() =>{
    setCurrentCharacter(animeCharacters[characterNumber])
    setTransitionCharacter(animeCharacters[characterNumber])
  }, [animeCharacters])

  //when currentcharacter state variable is updated, set currentName of character to be first name of character in lowercase letters
  useEffect(()=>{    
    currentCharacter
      ? setCurrentCharacterName(currentCharacter.title.split(" ").pop().toLowerCase())
      : setCurrentCharacterName('');
  },[currentCharacter])

  useEffect(()=>{
    if (correctGuess === true){
      setScore(score + 1);
      setCharacterNumber(characterNumber + 1)
      setCurrentCharacter(animeCharacters[characterNumber+1])
      
      setTransitionClass(true);
      setTimeout( () => {
        setTransitionCharacter(animeCharacters[characterNumber+1])
        setTransitionClass(false);      
      },1000)

      setCorrectGuess(false);
    }
  },[correctGuess])

 
  //app display
  return (
    <div className="App">
      <h1>ANIMEANIMEANIME</h1>
      <Timer />
      <div className= 'imageContainer'>
        {currentCharacter
          ?<CharacterImage image={currentCharacter.image_url} />
          :null
        }

        {currentCharacter
          ?<CharacterTransition image={transitionCharacter.image_url} transition={transitionClass} />
          :null
        }
      </div>

      <p>{currentCharacterName}</p>
      {currentCharacterName
        ?<UserInput 
          setUserInput={setUserInput}
          setCorrectGuess={setCorrectGuess}
          currentCharacterName={currentCharacterName}
        />
        :null
      }
      <Score
        score={score}
      />
    </div>
    
  );
}

export default App;
