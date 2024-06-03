import React, { useState, useEffect } from 'react';
import { Console } from 'console-feed' // https://www.npmjs.com/package/console-feed

import { useAuth } from '../context/AuthContext';
import { prompt_to_servers } from '../api';

import './server.css';

const Server = ({prop, isOpened, handleClickEvent}) => {
    const [status, setStatus] = useState(false);
    const [logs, setLogs] = useState([])

    const appendLog = (log) => {
        setLogs(
            (pv) => [...pv, log]
        )
        document.querySelector("#console").scrollTo(0,document.body.scrollHeight)
    }

    const onPrompt = (e) => {
        e.preventDefault();

        appendLog({method:'command', data:[e.target.prompt_field.value]})
        prompt_to_servers(
            prop.server_name,
            e.target.prompt_field.value,
            (msg) => appendLog({method:'result', data:[msg.data]})
        )
        .then(()=>alert('success :)'))
        .catch((e)=>{
            alert('failure :(')
            console.log(e)
        }
        );
    }

    useEffect(() => {
        let status = false;
        const checkServer = () => 
            fetch(prop.survival_check)
            .then((e) => {
                if (e.status === 200)
                    status = true;
                else 
                    status = false;
            })
            .catch(() => status = false)
            .finally(() => {
                setStatus(status)
                setLogs((prevLogs) =>
                    [ ...prevLogs,
                        status ? {method:'info', data:[`${prop.server_name} Server is active.`]} : {method:'warn', data:[`${prop.server_name} Server is down.`]},
                        //{method:'command', data:[{fine:'thanks',hello:'world'}]},
                        //{method:'result', data:[{well:'thanks',hello:'world'}]},
            
                    ]
                )
            })
        let interval=setInterval(checkServer,60000);
        checkServer();
        
        return () => {
            clearInterval(interval)
          };
    }, []);
    
    const {isAuthenticated} = useAuth();
    
    return (
        <li >
            <div
            className={`py-2 items-center cursor-pointer status ${status ? 'open' : 'dead'}`}
            id={prop.server_name}
            onClick={handleClickEvent}>
            {prop.server_name}
            </div>
            {isOpened && (
                <div className='console' id='console'>
                    <Console logs={logs} variant="light" />
                    <div className='prompt'>
                        <div className='prompt-cursor'/>
                        <form  onSubmit={onPrompt}><input className='prompt-field' type='text' tabIndex='-1' id='prompt_field'/></form>
                    </div>
                </div>
            )}

        </li>
    )
}

export default Server