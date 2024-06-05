import React, { useState, useEffect } from 'react';
import { Console } from 'console-feed' // https://www.npmjs.com/package/console-feed
import { NotificationManager } from 'react-notifications';

import { useCard } from '../context/CardContext';
import { isAuthenticationValid } from '../context/AuthContext';
import { prompt_to_servers } from '../api';

import './server.css';

const Server = ({prop, isOpened, handleClickEvent}) => {
    const [status, setStatus] = useState(false);
    const [logs, setLogs] = useState([]);
    const { setPhase } = useCard();

    const appendLog = (log) => setLogs((pv) => [...pv, log]);
    useEffect(() => document.querySelector("#console")?.scrollTo(0,document.body.scrollHeight), [logs]);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => document.querySelector("#prompt_field")?.focus(), [isLoading]);

    const onPrompt = (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        appendLog({method:'command', data:[e.target.prompt_field.value]})
        prompt_to_servers(
            prop.server_name,
            e.target.prompt_field.value,
            (msg) => appendLog({method:'result', data:[msg.data]})
        )
        .then(()=> {
            setIsLoading(false);
        })
        .catch((e)=>{
            if (e?.code === 1003) {
                NotificationManager.error('로그인이 필요합니다.')
                setPhase(2)
            } else {
                alert('failure :(')
                console.log(e)
            }
            setIsLoading(false);
        });
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
                    ]
                )
            })
        let interval=setInterval(checkServer,60000);
        checkServer();
        
        return () => {
            clearInterval(interval)
          };
    }, [prop.server_name, prop.survival_check]);
    
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
                    {isAuthenticationValid() && (
                    <div className='prompt'>
                        <div className='prompt-cursor'/>
                            <form  onSubmit={onPrompt} className='w100'>
                            {isLoading ? (
                                <div className='loading'/>
                            ) : (
                                <input className='prompt-field' type='text' tabIndex='-1' id='prompt_field'/>
                            )}
                            </form>
                    </div>
                    )}
                </div>
            )}

        </li>
    )
}

export default Server