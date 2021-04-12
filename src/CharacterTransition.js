const CharacterTransition = (props) =>{
    let classTemp= 'transitionImage'
    if (props.transition){
        classTemp += ' transitionAnimate'
    }
    return(
        <img className={classTemp} src={props.image}/>
    )
}
export default CharacterTransition;