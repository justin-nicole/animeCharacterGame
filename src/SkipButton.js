
const SkipButton = (props) =>{
    return(
        <button className="skipButton" onClick={()=>{props.setDidSkip(true)}}>SKIP</button>
    )
}

export default SkipButton