import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

import Server from './server';
import { get_servers } from '../api';
import { isAuthenticationValid } from '../context/AuthContext';
import './servers.css'
import './error.css'

const Servers = () => {
  const [error, setError] = useState(null);
  const [servers, setServers] = useState(null);
    const [openFolderId, setOpenFolderId] = useState(null);
    const handleServerClick = (id) => {
        setOpenFolderId((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        get_servers()
        .then((e) => setServers(e))
        .catch((e) => {
            console.log("failed to fetch server list: " + e)
            setError(true);
        });
    }, []);
    
    if (error) { 
        return (
        <div className='h100'>
        <h1 className='text_align_left h0'>Server</h1>
            
            <Tooltip title="서버 목록을 표시하는데.. 에러가 발생헀어요.." followCursor>
              <div className="error-desc"/>
            </Tooltip>
          </div>
        )
    }
    
    return (
        
        <div className='text_align_left h100 grid'>
            <h1>Server</h1>
            {
                !isAuthenticationValid() && (
                    <p className='status_bar'>You haven't logged in, UI is displayed but your action will be ignored</p>)
            }
        <ul className='server_list'>
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