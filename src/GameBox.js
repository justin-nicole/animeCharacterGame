import CharacterImage from './CharacterImage';

const GameBox = (props) =>{
    return(
        <div>
            <CharacterImage image = {props.image} />
        </div>
    )
}

export default GameBox;