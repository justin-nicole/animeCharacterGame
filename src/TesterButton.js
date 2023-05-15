import {useState} from 'react';

const TesterButton = (props) =>{
      const [testerButtonClass,setTesterbuttonClass] = useState('testerButton');

const testClick= ()=>{
    props.setTesterEnabled(!props.testerEnabled);
    !props.testerEnabled? setTesterbuttonClass("testerButton testerButtonPressed")
    : setTesterbuttonClass("testerButton")
    console.log(testerButtonClass);

}



    return(
        <button className={testerButtonClass} onClick={()=>{testClick()}}>Tester Mode</button>
    )
}

export default TesterButton