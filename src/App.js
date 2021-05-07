import './App.css';
import {useState, useEffect} from 'react';
import LandingPage from './LandingPage.js';
import Timer from './Timer.js';
import Score from './Score.js';
import UserInput from './UserInput.js';
import Footer from './Footer.js';
import CharacterTransition from './CharacterTransition';
import SkipButton from './SkipButton';
import GameOver from './GameOver';


function App() {
  //state variable to track user input
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
  //state variable to keep track of which character number the user is on
  const [characterNumber, setCharacterNumber] = useState(0);
  //state variable to hold score information
  const [score, setScore] = useState(0);
  //state variable for the transition character that needs to persist for the animation
  const [transitionCharacter, setTransitionCharacter] = useState({})
  //state variable to apply transition class
  const [transitionClass, setTransitionClass] = useState('none')
  //state variable to hold letterbank information 
  const [letterBank, setLetterBank]= useState([]);
  //state variable boolean that determines if user clicked skip button
  const [didSkip, setDidSkip] = useState(false);
  //state variable boolean that determines if user ran out of time
  const [gameOver, setGameOver] = useState(false);
  //state variable boolean that determines if user presses play again button
  const [playAgain, setPlayAgain] = useState(false);
  //state variable boolean that determines if user presses the start button
  const [didStart, setDidStart] = useState(false);
 
  
 
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
    let characters= 'ABCDEFGHIJKLMNOPQRTSUVWXYZ';
    let charactersLength= characters.length;
    for ( let i = 0; i < n; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
  }

  //function to scramble a new word bank
  const newLetterBank = () =>{
    const numLettersToAdd= 12-currentCharacterName.length;
    setLetterBank( shuffle((currentCharacterName)+createRandomLetters(numLettersToAdd)).split(''));
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
    //call api fetch when app mounts
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
      ? setCurrentCharacterName(currentCharacter.title.split(" ").pop().toUpperCase())
      : setCurrentCharacterName('');
      
  },[currentCharacter])

  //make a new word bank when the current charactername changes
  useEffect( ()=>{
    newLetterBank();
  },[currentCharacterName])

  //when a character is correctly guessed or a character is skipped, transition and move to next character
  useEffect(()=>{
    if (correctGuess === true ){
      setScore(score + 1)
      //currentCharacter is updated to the next one in the array
      setCharacterNumber(characterNumber + 1)
      setCurrentCharacter(animeCharacters[characterNumber+1])
      //transition animation is triggered
      setTransitionClass('correct');
      //allow transition to persist for the animation duration
      setTimeout( () => {
        setTransitionCharacter(animeCharacters[characterNumber+1])
        setTransitionClass('none');      
      },300)
      //reset the boolean for correct guess to false
      setCorrectGuess(false);
      //reset the boolean for didskip to false
      setDidSkip(false);
    }
    if (didSkip === true ){
      //currentCharacter is updated to the next one in the array
      setCharacterNumber(characterNumber + 1)
      setCurrentCharacter(animeCharacters[characterNumber+1])
      //transition animation is triggered
      setTransitionClass('skip');
      //allow transition to persist for the animation duration
      setTimeout( () => {
        setTransitionCharacter(animeCharacters[characterNumber+1])
        setTransitionClass('none');      
      },300)
      //reset the boolean for correct guess to false
      setCorrectGuess(false);
      //reset the boolean for didskip to false
      setDidSkip(false);
    }
  },[correctGuess, didSkip])

  //if user presses play again, shuffle array and reset relevant states
  useEffect(() =>{
    if (playAgain){
      const tempArray = [...animeCharacters]
      shuffleArray(tempArray);
      setAnimeCharacters(tempArray);
      setScore(0);
      setCharacterNumber(0);
      setGameOver(false);
      setPlayAgain(false);
    }

  },[playAgain])




 
  //app display that is largely based on didStart; will return jsx for components until player presses start
  return (
    <div className="App">
      {/* landing page shows if player has not clicked start*/}
      {didStart === false
        ?<LandingPage setDidStart={setDidStart} />
        :null
      }
      {/* gameover screen shows if player runs out of time*/}
      {gameOver
        ?<GameOver score={score} setPlayAgain={setPlayAgain} />
        :null
      }
      {/* timer is rendered and starts when player click start*/}
      {didStart === true 
        ?<div className='timerScoreParent'>
          <Timer setGameOver={setGameOver} playAgain={playAgain}/> 
          <Score score={score}/>
         </div>
        :null
      }
      {/* characters UI will be displayed when player clicks start*/}
      {didStart === true
      ?<div className= 'mainGame'>
          {currentCharacter
            ?<CharacterTransition 
              charImage={currentCharacter.image_url} 
              image={transitionCharacter.image_url} 
              transition={transitionClass} 
              alt={currentCharacter.title}
            />
            :null
          }
        </div>
      :null}
      {/* input will show when player cliks start*/}
      {didStart === true
        ?<UserInput 
          setCorrectGuess={setCorrectGuess}
          currentCharacterName={currentCharacterName}
          letterBank={letterBank}
          setLetterBank={setLetterBank}
          didSkip={didSkip}
          setDidSkip={setDidSkip}
          playAgain={playAgain}
          gameOver={gameOver}
        />
        :null
      }
      {/*skip button shows when player clicks start */}
      {didStart === true 
        ?<SkipButton setDidSkip={setDidSkip}/>
        :null
      }
      {/* footer is always rendered*/}
      <Footer />
    </div>
    
  );
}

export default App;
