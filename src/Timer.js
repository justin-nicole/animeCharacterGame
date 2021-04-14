<<<<<<< HEAD
const Timer = () => {
    return(
        <div>
            <p>timer</p>
=======
import {useState, useEffect, useRef} from 'react';

const Timer = () => {
    const [minutes,setMinutes] = useState();
    const [seconds, setSeconds]= useState();

    let interval = useRef();

    const startTimer = () =>{
        const timeMax = 65;
        let timeElapsed = 0;

        interval = setInterval ( () => {
            let timeLeft = timeMax-timeElapsed

            if (timeMax-timeElapsed <=0){
                //stop timer 
                clearInterval(interval.current);
            } else {
                timeElapsed = timeElapsed+1;
                timeLeft = timeMax-timeElapsed
                setMinutes(Math.floor(timeLeft / 60))
                setSeconds(Math.floor(timeLeft % 60))                
            }
        }, 1000)
    }
    useEffect(() => {
        startTimer();
      },[]);

    return(
        <div className='timerScoreContainer'>
            <h2>Timer
                 </h2>
            <h2>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
>>>>>>> main
        </div>
    )
}

export default Timer;