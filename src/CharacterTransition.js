const CharacterTransition = (props) =>{
    let classTemp= 'transitionImage'
    let classTemp2= 'transitionFilter '
        //if a correct guess was input, add the transition class
    if (props.transition){
        classTemp += ' transitionAnimateColor transitionAnimateSlide';
        classTemp2 += ' transitionAnimateSlide'

    }
    
    return(
        <div className='transitionContainer '>
            <div className='coverTransitionLeft'></div>
            <div className='coverTransitionRight'></div>
            <div className={classTemp2}></div>
            <img className={classTemp} src={props.image}/>
        </div>
    )
}
export default CharacterTransition;