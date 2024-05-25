import Frame from './frame';
import Login from './login';
import { useCard } from '../context/CardContext';
import './card.css'
import { useEffect } from 'react';

const Card = () => {
    const { phase } = useCard();
    useEffect(()=>{
        document.querySelector("#card > div").style.opacity=1
    },[])

    return (
        <div className="card" id="card">
            { (phase & 1) > 0 && (<Frame/>) }
            { (phase & 2) > 0 && (<Login/>) }
        </div>
    );
}

export default Card
