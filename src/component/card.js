import Frame from './frame';
import Login from './login';
import { useCard } from '../context/CardContext';

const Card = () => {
    const { phase } = useCard();

    return (
        <div>
            { phase === 0 && (<Frame/>) }
            { phase === 1 && (<Login/>) }
        </div>
    );
}

export default Card
