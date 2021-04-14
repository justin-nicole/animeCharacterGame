import './App.css';
import {useState, useEffect} from 'react';
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
  const [letterBank, setLetterBank]= useState('');
 
  
 
  //function to randomize array of characters from api
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  //function to randomize letters in a string
  const shuffle = (word) => {
    let shuffledName = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledName +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledName;
  }

  //function to generate random letters
  const createRandomLetters= (n) => {
    let result= [];
    let characters= 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength= characters.length;
    for ( let i = 0; i < n; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
  }

  //function to scramble a new word bank
  const newLetterBank = () =>{
    const numLettersToAdd= 14-currentCharacterName.length;
    setLetterBank( shuffle((currentCharacterName)+createRandomLetters(numLettersToAdd)));
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

  //make a new word bank when the current charactername changes
  useEffect( ()=>{
    newLetterBank();
  },[currentCharacterName])

  //when the correct name is input....
  useEffect(()=>{
    if (correctGuess === true){
      //score increases by1
      setScore(score + 1);
      //currentCharacter is updated to the next one in the array
      setCharacterNumber(characterNumber + 1)
      setCurrentCharacter(animeCharacters[characterNumber+1])
      
      //transition animation is triggered
      setTransitionClass(true);
      setTimeout( () => {
        setTransitionCharacter(animeCharacters[characterNumber+1])
        setTransitionClass(false);      
      },300)

      //reset the boolean for correct guess to false
      setCorrectGuess(false);
    }
  },[correctGuess])

 
  //app display
  return (
    <div className="App">
      <div className='timerScoreParent'>
        <Timer /> 
        <Score score={score}/>
      </div>

      <div className= 'mainGame'>
        {currentCharacter
          ?<CharacterImage image={currentCharacter.image_url} />
          :null
        }
        {currentCharacter
          ?<CharacterTransition image={transitionCharacter.image_url} transition={transitionClass} />
          :null
        }
      </div>

      {currentCharacterName
        ?<UserInput 
          setUserInput={setUserInput}
          setCorrectGuess={setCorrectGuess}
          currentCharacterName={currentCharacterName}
          letterBank={letterBank}
        />
        :null
      }
      <UserInput />
    </div>
    
  );
}

export default App;
