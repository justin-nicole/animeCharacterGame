
import {useState,useEffect} from 'react';
import InputKey from './InputKey'

const UserInput = (props) => {
    const [input, setInput] = useState('');
    const [totalInput, setTotalInput] = useState([]);
 
    const handleClickLetterBank = (e) => {
        console.log(e.target.textContent)
    }

    const logInput = (e) =>{
        setInput(String.fromCharCode(e.keyCode).toLowerCase());
    }

    useEffect(() =>{
        document.addEventListener("keydown", logInput)
 
    }, [])

    useEffect( () =>{
    const copyOfTotalInput = [...totalInput]
        if (input === "\b"){
            for (let i = copyOfTotalInput.length-1; i>-1; i--){
            if (copyOfTotalInput[i]!==''){
                copyOfTotalInput.splice(i,1);
                break;
            }
            }

        setTotalInput(copyOfTotalInput)
        }else if (input !== ''){
            if (copyOfTotalInput[copyOfTotalInput.length-1] === ''){
        copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,input)
        setTotalInput(copyOfTotalInput)
            }
        }
        setInput('');
    },[input])

   
    useEffect( () =>{      
        const copyOfTotalInput= [...totalInput]
        if (copyOfTotalInput.length < props.currentCharacterName.length){
        for (let i=copyOfTotalInput.length; i<props.currentCharacterName.length; i++){
            copyOfTotalInput.push('')
        }
        setTotalInput(copyOfTotalInput);
    } else if (copyOfTotalInput.length > props.currentCharacterName.length){
      
        for (let i=copyOfTotalInput.length; i>props.currentCharacterName.length; i--){
            copyOfTotalInput.pop()
        }
        setTotalInput(copyOfTotalInput);
    }
    },[totalInput,props.currentCharacterName])

    useEffect(() =>{
        const copyOfTotalInput = [...totalInput]
        if (props.currentCharacterName === copyOfTotalInput.join('') && props.currentCharacterName!== ''){
            props.setCorrectGuess(true);
            setTotalInput([]);
        }
    })


 


    return(
        <div>
            <ul className="characterNameParent">
            { totalInput
                    ?totalInput.map((letter) =>{
                        if (letter === ''){
                            return <li className="characterNameLetter empty"></li>
                        }else
                            return <li className="characterNameLetter full">{letter.toUpperCase()}</li>
                    })
                    :null
                }
            </ul>
            <div className="flexParent">
                <ul className="characterNameParent letterBank">
                    {
                        props.letterBank.toUpperCase().split('').map((letter) =>{
                            return <li className="characterNameLetter full" onClick={(e) => handleClickLetterBank(e)}>{letter}</li>
                        })
                    }
                </ul>
            </div>
            <div>
                <h2>{totalInput}</h2>
            </div>


        </div>
    )
}

export default UserInput;
