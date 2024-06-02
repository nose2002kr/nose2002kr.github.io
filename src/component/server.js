import React, { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

import './server.css';

const Server = ({prop}) => {
    const [status, setStatus] = useState(false);
    useEffect(() => {
        const checkServer = () =>
            fetch(prop.survival_check)
            .then((e)=>{
                if (e.status === 200)
                    setStatus(true);
                else 
                    setStatus(false);
            })
            .catch(()=>{
                setStatus(false);
            })
        let interval=setInterval(checkServer,5000);
        checkServer();
        
        return () => {
            clearInterval(interval)
          };
    }, []);
    
    const {isAuthenticated} = useAuth();
    
    return (
        <li 
            className={`py-2 flex items-center cursor-pointer status ${status ? 'open' : 'dead'}`}
            id={prop.server_name}
            >
            {prop.server_name}
        </li>
    )
}

export default Server