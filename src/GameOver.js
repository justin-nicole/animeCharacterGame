
const GameOver = (props) =>{

return(
    <div className='gameOverContainer'>
        <h4 className='gameOver'>GAME OVER!</h4>
        <h4 className='gameOver'>YOUR SCORE:</h4>
        <h4 className='gameOver'>{props.score}</h4>
        <button className='gameOverButton' onClick={()=>{props.setPlayAgain(true)}}>Play Again</button>
        
    </div>  
)}

export default GameOver;