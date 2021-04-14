
import {useState,useEffect} from 'react';
import InputKey from './InputKey'

const UserInput = (props) => {
    const [input, setInput] = useState('');
    const [totalInput, setTotalInput] = useState([]);
    // const [isInitialRender, setIsInitialRender] = useState(true
    // let isInitialRender = true;
 
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
        copyOfTotalInput.pop();
        setTotalInput(copyOfTotalInput)
        }else if (input !== ''){
        copyOfTotalInput.push(input)
        setTotalInput(copyOfTotalInput)
        }
        setInput('');
    },[input])



    useEffect(() =>{
        const copyOfTotalInput = [...totalInput]
        if (props.currentCharacterName === copyOfTotalInput.join('') && props.currentCharacterName!== ''){
            props.setCorrectGuess(true);
            setTotalInput('');
        }
    })


    return(
        <div>
            <ul className="characterNameParent">
                { 
                    props.currentCharacterName.split('').map(() =>{
                        return <li className="characterNameLetter empty"></li>
                    })
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

































//legacy code if feature doesnt workout

// import {useState,useEffect} from 'react';
// import InputKey from './InputKey'

// const UserInput = (props) => {
//     const [input, setInput] = useState('');
//     const [totalInput, setTotalInput] = useState('');

//     const logInput = (e) =>{
//         setInput(String.fromCharCode(e.keyCode).toLowerCase());
//     }

//     useEffect(() =>{
//         document.addEventListener("keydown", logInput)
 
//     }, [])

//     useEffect( () =>{
//         if (input === "\b"){
//         setTotalInput(totalInput.slice(0,-1))
//         }else{
//         setTotalInput(totalInput+input)
//         }
//         setInput('');

//     },[input])

//     useEffect(() =>{
//         if (props.currentCharacterName === totalInput && props.currentCharacterName!== ''){
//             props.setCorrectGuess(true);
//             setTotalInput('');
//         }
//     })


//     return(
//         <div>
//             <div>
//                 <h2>{props.currentCharacterName}</h2>
//             </div>
//             <div>
//                 <InputKey letter='a'/>
//             </div>
//             <div>
//                 <h2>{totalInput}</h2>
//             </div>


//         </div>
//     )
// }

// export default UserInput;