import {useState, useEffect, useRef} from 'react';

const Timer = (props) => {
    const [minutes,setMinutes] = useState(0);
    const [seconds, setSeconds]= useState(30);
    const [timeRemaining, setTimeRemaining]= useState();
    let interval = useRef();

    const startTimer = () =>{
        //this determines how much time user has
        const timeMax = 30;
        let timeElapsed = 0;
        //timer that updates the value of minutes and seconds every second
        interval = setInterval ( () => {
            let timeLeft = timeMax-timeElapsed
            if (timeLeft <=0){
                //stop timer when time is up ()
                clearInterval(interval);
                //trigger gameOver screen and behaviour
                props.setGameOver(true);
                
                //if game is not over, update timer appropriately
            } else {
                timeElapsed = timeElapsed+1;
                timeLeft = timeMax-timeElapsed
                setTimeRemaining(timeLeft);
                setMinutes(Math.floor(timeLeft / 60))
                setSeconds(Math.floor(timeLeft % 60))        
            }
        }, 1000)
    }
    //start timer again is user presses play again button
    useEffect(() => {
        startTimer();
      },[props.playAgain]);

    return(
        <div className='timerScoreContainer timerContainer'>
            <h2>Timer</h2>
            {/* if time remaining is under 10 seconds, display time in red */}
            {timeRemaining <= 10 
                ?<h2 className= 'red'>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
                :<h2>{minutes} : { seconds < 10 ? `0${ seconds }` : seconds }</h2>
            }
        </div>
    )
}

export default Timer;