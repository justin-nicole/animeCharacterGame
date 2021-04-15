import CharacterImage from "./CharacterImage";


const CharacterTransition = (props) =>{
    let classTemp= 'transitionImage'
    let classTemp2= ''
        //if a correct guess was input, add the transition class
    if (props.transition === 'correct'){
        classTemp += ' transitionOpacity transitionAnimateSlideLeft';
        classTemp2= 'transitionFilterGreen'
        classTemp2 += ' transitionAnimateSlideLeft'

    }
    if (props.transition === 'skip'){
        classTemp += ' transitionOpacity transitionAnimateSlideRight';
        classTemp2= 'transitionFilterRed'
        console.log (classTemp2)
        classTemp2 += ' transitionAnimateSlideRight'
        

    }
    
    return(
        <div className='transitionContainer '>
            <CharacterImage image={props.charImage}/>
            <div className='coverTransitionLeft'></div>
            <div className='coverTransitionRight'></div>
            <div className={classTemp2}></div>
            <img className={classTemp} src={props.image}/>
        </div>
    )
}
export default CharacterTransition;