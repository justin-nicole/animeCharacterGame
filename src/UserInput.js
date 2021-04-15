
import {useState,useEffect} from 'react';


const UserInput = (props) => {
    const [input, setInput] = useState('');
    const [totalInput, setTotalInput] = useState([]);

    const handleClickLetterBank = (e) => {
        setInput(e.target.id)
    }

    const logInput = (e) =>{
        setInput(String.fromCharCode(e.keyCode).toUpperCase());
    }

    useEffect(() =>{
        document.addEventListener("keydown", logInput)
    }, [])

    useEffect( () =>{
        const copyOfLetterBank = [...props.letterBank]
        const copyOfTotalInput = [...totalInput]
        let copyOfInput = input;
        if (props.gameOver === false){
            if (copyOfTotalInput[copyOfTotalInput.length-1] === ''){
                if (copyOfInput.startsWith('bank')){
                    if (copyOfInput[(copyOfInput.length-2)] === '1'){
                    copyOfInput = copyOfInput.substring(copyOfInput.length-2);
                    copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(parseInt(copyOfInput),1,'').join(''))
                    setTotalInput(copyOfTotalInput)
                    props.setLetterBank(copyOfLetterBank); 
                    }else{
                        copyOfInput = copyOfInput.substring(copyOfInput.length-1);
                        copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(parseInt(copyOfInput),1,'').join(''))
                        setTotalInput(copyOfTotalInput)
                        props.setLetterBank(copyOfLetterBank); 
                    }
                }else if (copyOfLetterBank.includes(input) === true){
                    if (copyOfTotalInput[copyOfTotalInput.length-1] === ''){
                        copyOfTotalInput.splice(copyOfTotalInput.indexOf(''),1,copyOfLetterBank.splice(copyOfLetterBank.indexOf(input),1,'').join(''))
                        setTotalInput(copyOfTotalInput)
                        props.setLetterBank(copyOfLetterBank); 
                    }
                } 
            }

            if (copyOfInput.startsWith('name') && totalInput[0] !== ''){
                copyOfInput = copyOfInput.substring(copyOfInput.length-1);
                copyOfLetterBank.splice(copyOfLetterBank.indexOf(''),1,copyOfTotalInput.splice(parseInt(copyOfInput),1).join(''));
                setTotalInput(copyOfTotalInput)
                props.setLetterBank(copyOfLetterBank); 

            }else if (input === "\b"){
                for (let i = copyOfTotalInput.length-1; i>-1; i--){
                    if (copyOfTotalInput[i]!==''){
                        copyOfLetterBank.splice(copyOfLetterBank.indexOf(''),1,copyOfTotalInput.splice(i,1).join(''));
                        break;
                    }
                }
                props.setLetterBank(copyOfLetterBank);    
                setTotalInput(copyOfTotalInput)
            } else if (input === "À" || input === 'Þ'){
                props.setDidSkip(true)
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
            setTotalInput(['']);
        }
        if (props.didSkip === true) 
        {setTotalInput([''])}
        if (props.playAgain === true) 
        {setTotalInput([''])}
    })




    let counter = 0;
    const counterReset = () =>{
        counter = 0
    }
 


    return(
        <div>
            <ul className="characterNameParent">
            { totalInput
                    ?totalInput.map((letter) =>{
                        if (letter === ''){
                            return <li className="characterNameInput empty" onClick={(e) => handleClickLetterBank(e)} key={`name${counter++}`} id={`name${counter}`} ></li>
                        }else
                            return <li className="characterNameInput full" onClick={(e) => handleClickLetterBank(e)}  key={`name${counter++}`} id={`name${counter}`}>{letter.toUpperCase()}</li>
                    })
                    :props.currentCharacterName.split('').map(() =>{
                        return <li className="characterNameInput empty"></li>
                    })
                }
            {counterReset()}
            </ul>
            <div className="flexParent">
                <ul className="characterNameParent letterBank">
             
                    {
                        props.letterBank.map((letter) =>{
                            if (letter !== ''){
                                return <li className="characterNameBank full" onClick={(e) => handleClickLetterBank(e)} key={`bank${counter++}`} id={`bank${counter}`}>{letter}</li>
                            }else return <li className="characterNameBank empty" onClick={(e) => handleClickLetterBank(e)} key={`bank${counter++}`} id={`bank${counter}`}>{letter}</li>
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









// { totalInput
//     ?totalInput.map((letter) =>{
//         if (letter === ''){
//             return <li className="characterNameLetter empty"></li>
//         }else
//             return <li className="characterNameLetter full">{letter.toUpperCase()}</li>
//     })
//     :null
// }





// { 
//     props.currentCharacterName.split('').map(() =>{
//         return <li className="characterNameLetter empty"></li>
//     })
// }

















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