import Frame from './frame';
import Login from './login';
import { useCard } from '../context/CardContext';
import './card.css'

const Card = () => {
    const { phase } = useCard();

    return (
        <div className="card" id="card">
            { (phase & 1) > 0 && (<Frame/>) }
            { (phase & 2) > 0 && (<Login/>) }
        </div>
    );
}

export default Card
