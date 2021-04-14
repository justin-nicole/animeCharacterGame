<<<<<<< HEAD
const Score = () => {
    return(
        <div>
            <p>score</p>
=======
const Score = (props) => {
    return(
        <div className='timerScoreContainer'>
            <h2>Score</h2>
            <h2>{props.score}</h2>
>>>>>>> main
        </div>
    )
}

export default Score;