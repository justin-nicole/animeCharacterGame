
import {useState,useEffect} from 'react';


const UserInput = (props) => {
    //stateful variable to store keydown press or value of click
    const [input, setInput] = useState('');
    //stateful variable to store user's guess
    const [totalInput, setTotalInput] = useState([]);
    //counter variable for ID and Key assignment
    let counter = 0;
    //reset counter with this function
    const counterReset = () =>{
        counter = 0
    }

    //event handler for clicking
    const handleClick = (e) => {
        //target ids are unique to each element
        setInput(e.target.id)
    }
    //event handler for keyboard input
    const logInput = (e) =>{
        //takes the keycode, truns it into its corresponding character, turns that into a string and makes sure its uppercase
        setInput(String.fromCharCode(e.keyCode).toUpperCase());
    }

    //use effect that applies on mount-- sets event listener on document level for keyboard input
    useEffect(() =>{
        document.addEventListener("keydown", logInput)
    }, [])


    //this use effect is used to make sure that totalInput always has an array length equal to the currentCharacter's name. empty strings are passed into totalInput array to make it longer
    useEffect( () =>{              
        const copyOfTotalInput= [...totalInput]
        //if totalInput is too short and needs to be longer, push empty strings into it)
        if (copyOfTotalInput.length < props.currentCharacterName.length){
        for (let i=copyOfTotalInput.length; i<props.currentCharacterName.length; i++){
            copyOfTotalInput.push('')
        }
        setTotalInput(copyOfTotalInput);
        //if totalinput is too long or has too many empty strings, remove the last element (which should be an empty string) until the length matches the current character's length
    } else if (copyOfTotalInput.length > props.currentCharacterName.length){
        for (let i=copyOfTotalInput.length; i>props.currentCharacterName.length; i--){
            copyOfTotalInput.pop()
        }
        setTotalInput(copyOfTotalInput);
    }
    //dependency array has totalinput so that whenever a valid input is detected, it will fix the totalinput array, and when a new character is loaded, it will push empty strings
    },[totalInput,props.currentCharacterName])


    //use effect for when an input is detected
    useEffect( () =>{
        const copyOfLetterBank = [...props.letterBank]
        const copyOfTotalInput = [...totalInput]
        let copyOfInput = input;
        
        //dont let user interact when gameover screen is shown
        if (props.gameOver === false){
            //logic for click behaviour
            //if the last element of totalInput is an empty string, then proceed 
            if (copyOfTotalInput[copyOfTotalInput.length-1] === ''){
                //if the click input starts with bank, it means the user clicked a valid letterbank element
                if (copyOfInput.startsWith('bank')){
                    //if the user clicked an element with an double digit ID....
                    if (copyOfInput[(copyOfInput.length-2)] === '1'){
                        //turn copyofInput into the last two characters of the string (e.g. input of bank12 turns into 12)
                        copyOfInput = copyOfInput.substring(copyOfInput.length-2);
                        //remove the first empty string in totalinput and replace it with the corresponding value that user clicked
                        copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(parseInt(copyOfInput),1,'').join(''))
                        // use setstate to change totalinput
                        setTotalInput(copyOfTotalInput)
                        //use setstate to change letterBank
                        props.setLetterBank(copyOfLetterBank); 
                    }else{
                        //else if the user clicked an element with a single digit ID, repeat steps in previous block, but take the last character of the input
                        copyOfInput = copyOfInput.substring(copyOfInput.length-1);
                        copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(parseInt(copyOfInput),1,'').join(''))
                        setTotalInput(copyOfTotalInput)
                        props.setLetterBank(copyOfLetterBank); 
                    }
                    //logic for valid non backspace keyboard press
                    //if the user's input is included in the letter bank (and thus is a valid action).....
                }else if (copyOfLetterBank.includes(input) === true){
                    //remove the first empty string in totalinput and then replace it with the the first instance of the user's input that appears in the letterbank
                    copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(copyOfLetterBank.indexOf(input),1,'').join(''))
                    setTotalInput(copyOfTotalInput)
                    props.setLetterBank(copyOfLetterBank); 
                } 
            }

            //more click logic
            //if user clicks one of the characters they previously inputed, this block will remove it and add it back to the letterbank
            //inputted elements start with the id "name"... if the inputted element is selected and total input was not completely empty to begin with.....
            if (copyOfInput.startsWith('name') && totalInput[0] !== ''){
                //change input into the last character of the click input
                copyOfInput = copyOfInput.substring(copyOfInput.length-1);
                //find a the first blank string in letterbank and replace it with what was clicked (thus moving it from input to letterbank)
                copyOfLetterBank.splice(copyOfLetterBank.indexOf(''),1,copyOfTotalInput.splice(parseInt(copyOfInput),1).join(''));
                setTotalInput(copyOfTotalInput)
                props.setLetterBank(copyOfLetterBank); 

            //if user inputs a backspace
            }else if (input === "\b"){
                //starting from the last input....
                for (let i = copyOfTotalInput.length-1; i>-1; i--){
                    if (copyOfTotalInput[i]!==''){
                        ///remove the last non-empty string and put it back into the letterbank
                        copyOfLetterBank.splice(copyOfLetterBank.indexOf(''),1,copyOfTotalInput.splice(i,1).join(''));
                        break;
                    }
                }
                props.setLetterBank(copyOfLetterBank);    
                setTotalInput(copyOfTotalInput)
                //if the user presses the skip button which is ` .....
            } else if (input === "À" || input === 'Þ'){
                //skip to next character
                props.setDidSkip(true)
            }
        }
        //set input to an empty string and await next input
        setInput('');
    },[input])

   
    useEffect(() =>{
        const copyOfTotalInput = [...totalInput]
        //if user correctly guesses the character's name,
        if (props.currentCharacterName === copyOfTotalInput.join('') && props.currentCharacterName!== ''){
            //setCorrect guess to true and reset totalinput
            props.setCorrectGuess(true);
            setTotalInput(['']);
        }
        //reset total input if user skipped
        if (props.didSkip === true) 
        {setTotalInput([''])}
        //reset total input if user presses play again after a gameover
        if (props.playAgain === true) 
        {setTotalInput([''])}
    })


    return(
        <div>
            <ul className="characterNameParent">
                {/* if totalinput is not invalid, then map it using totalinput. totalinput's length is always equal to the length of the currentCharacter's name  */}
            { totalInput
                    ?totalInput.map((letter) =>{
                        //if the current interation's letter is an empty string, then give it the empty class
                        if (letter === ''){
                            return <li className="characterNameInput empty" onClick={(e) => handleClick(e)} key={`name${counter++}`} id={`name${counter}`} ></li>
                        //otherwise give it the full class
                        }else
                            return <li className="characterNameInput full" onClick={(e) => handleClick(e)}  key={`name${counter++}`} id={`name${counter}`}>{letter.toUpperCase()}</li>
                    })
                    // failsafe-- create empty placeholder elements equal to length of current character name
                    :props.currentCharacterName.split('').map(() =>{
                        return <li className="characterNameInput empty"></li>
                    })
                }
            {counterReset()}
            </ul>
            <div className="flexParent">
                <ul className="characterNameParent letterBank">
                    {
                        //map according the letterBank
                        props.letterBank.map((letter) =>{
                            //like above, give different classes depending on if the iteration's letter is a an empty string or not
                            if (letter !== ''){
                                return <li className="characterNameBank full" onClick={(e) => handleClick(e)} key={`bank${counter++}`} id={`bank${counter}`}>{letter}</li>
                            }else return <li className="characterNameBank empty" onClick={(e) => handleClick(e)} key={`bank${counter++}`} id={`bank${counter}`}>{letter}</li>
                        })
                    }
                    {counterReset()}
                </ul>
            </div>
            <div>
            </div>
        </div>
    )
}

export default UserInput;