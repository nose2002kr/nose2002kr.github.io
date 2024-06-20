import React, { useState, useEffect } from 'react';

import Server from './server';
import { get_servers } from '../api';
import { isAuthenticationValid } from '../context/AuthContext';
import './servers.css'

const Servers = () => {
    const [servers, setServers] = useState(null);
    const [openFolderId, setOpenFolderId] = useState(null);
    const handleServerClick = (id) => {
        setOpenFolderId((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        get_servers()
        .then((e) => setServers(e))
        .catch((e) => console.log("failed to fetch server list: " + e));
    }, []);
    
    return (
        <div>
            {
                !isAuthenticationValid() && (
                    <p className='status-bar'>You haven't logged in, UI is displayed but your action is ignored</p>)
            }
        <ul>
        {
            servers !== null &&
            servers.map((server, idx) => (
            <Server 
                prop={server}
                isOpened={openFolderId === idx}
                handleClickEvent={()=>handleServerClick(idx)}
             />
            ))
        }
        </ul>
    </div>
    )
}

export default Servers