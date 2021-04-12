import {useState,useEffect} from 'react';

const UserInput = (props) => {
    const [input, setInput] = useState('');
    useEffect(() =>{
        if (props.currentCharacterName === input.toLocaleLowerCase() && props.currentCharacterName!== ''){
            props.setCorrectGuess(true);
            setInput('');
        }
    })
    return(
        <form>
            <input 
            type="text"
            id="inputField"
            value= {input}
            onChange={e => {
                props.setUserInput(e.target.value)
                setInput(e.target.value);
            }}
            />
        </form>
    )
}

export default UserInput;