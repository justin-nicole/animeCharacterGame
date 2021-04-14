import {useState,useEffect} from 'react';
import InputKey from './InputKey'

const UserInput = (props) => {
    const [input, setInput] = useState('');
    const [totalInput, setTotalInput] = useState('');

    const logInput = (e) =>{
        setInput(String.fromCharCode(e.keyCode).toLowerCase());
    }



    useEffect(() =>{
        document.addEventListener("keydown", logInput)
 
    }, [])

    useEffect( () =>{
        if (input === "\b"){
        setTotalInput(totalInput.slice(0,-1))
        }else{
        setTotalInput(totalInput+input)
        }
        setInput('');

    },[input])

    useEffect(() =>{
        if (props.currentCharacterName === totalInput && props.currentCharacterName!== ''){
            props.setCorrectGuess(true);
            setTotalInput('');
        }
    })

 




    return(
        <div>
            <h2>{totalInput}</h2>
            <InputKey currentCharacterName={props.currentCharacterName}/>
        </div>
        // <form>
        //     <input 
        //     type="text"
        //     id="inputField"
        //     value= {input}
        //     onChange={e => {
        //         props.setUserInput(e.target.value)
        //         setInput(e.target.value);
        //     }}
        //     />
        // </form>
    )
}

export default UserInput;