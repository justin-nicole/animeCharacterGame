import {useState, useEffect, useRef} from 'react';

const Timer = (props) => {
    const [minutes,setMinutes] = useState();
    const [seconds, setSeconds]= useState();
    const [timeRemaining, setTimeRemaining]= useState();
    let interval = useRef();

    const startTimer = () =>{
        const timeMax = 5;
        let timeElapsed = 0;

        interval = setInterval ( () => {
            let timeLeft = timeMax-timeElapsed

            if (timeMax-timeElapsed <=0){
                //stop timer 
                clearInterval(interval);
                props.setGameOver(true);
                
            } else {
                timeElapsed = timeElapsed+1;
                timeLeft = timeMax-timeElapsed
                setTimeRemaining(timeLeft);
                setMinutes(Math.floor(timeLeft / 60))
                setSeconds(Math.floor(timeLeft % 60))        
            }
        }, 1000)
    }
    useEffect(() => {
        startTimer();
        // return clearInterval(interval);
      },[props.playAgain]);

    return(
        <div className='timerScoreContainer timerContainer'>
            <h2>Timer</h2>
            {timeRemaining <= 10 
                ?<h2 className= 'red'>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
                :<h2>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
            }
        </div>
    )
}

export default Timer;