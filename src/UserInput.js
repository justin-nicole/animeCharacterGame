import {useState} from 'react';

const UserInput = (props) => {
    const [input, setInput] = useState('');

    return(
        <form>
            <input 
            type="text"
            onChange={e => {
                props.getUserInput(e.target.value)
                setInput(e.target.value);
            }}
            />
        </form>
    )
}

export default UserInput;