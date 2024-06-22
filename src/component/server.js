import React, { useState, useEffect } from 'react';
import { Console } from 'console-feed' // https://www.npmjs.com/package/console-feed
                                        // 'log' | 'debug' | 'info' | 'warn' | 'error' | 'table' | 'clear' | 'time' | 'timeEnd' | 'count' | 'assert' | 'command' | 'result' | 'dir'

//import { isAuthenticationValid } from '../context/AuthContext';

import { run_to_server, status_server_power, turn_off_server, turn_on_server } from '../api';

import './server.css';

const Server = ({prop, isOpened, handleClickEvent}) => {
    const [status, setStatus] = useState(false);
    const [logs, setLogs] = useState([]);

    const appendLog = (log) => setLogs((pv) => [...pv, log]);
    useEffect(() => document.querySelector("#console")?.scrollTo(0,document.body.scrollHeight), [logs]);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => document.querySelector("#prompt_field")?.focus(), [isLoading]);

    const onPrompt = (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        appendLog({method:'command', data:[e.target.prompt_field.value]})
        run_to_server(
            prop.server_name,
            e.target.prompt_field.value,
            (msg) => appendLog({method:'result', data:[msg.data]})
        )
        .then(()=> {
            setIsLoading(false);
        })
        .catch((e)=>{
            if (e?.code === 1003) {
                appendLog({method:'error', data:['failed to run command, login required']})
            } else {
                appendLog({method:'error', data:['failed to run command']})
                console.log(e)
            }
            setIsLoading(false);
        });
    }
    
    const checkServer = () => {
        let status = false;
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
            appendLog(status ?
                {method:'info', data:[`${prop.server_name} Server is active.`]} :
                {method:'warn', data:[`${prop.server_name} Server is down.`]}
            );
        });
    }
    useEffect(() => {
        let interval=setInterval(checkServer,60000);
        checkServer();
        return () => {
            clearInterval(interval)
          };
    }, [prop.server_name, prop.survival_check]);
    
    const handleSwitchClickEvent = () => {
        if (document.getElementById(`${prop.server_name}_power`).disabled)
            return;
        
        let control = status ? turn_off_server : turn_on_server;
        let keepStatus = status;
        setStatus(!!!keepStatus); 
        document.getElementById(`${prop.server_name}_power`).disabled = true;
        control(prop.server_name).then(() => {
            let checkPowerStatus = setInterval(() => {
                status_server_power(prop.server_name).then(e => {
                    if (e.power_status === 'STOPPED') {
                        appendLog({method:'info', data:[`${prop.server_name} Server power switched off`]})
                        clearInterval(checkPowerStatus);
                        document.getElementById(`${prop.server_name}_power`).disabled = false;
                        checkServer();
                    } else if (e.power_status === 'STARTED') {
                        appendLog({method:'info', data:[`${prop.server_name} Server power switched on`]})
                        clearInterval(checkPowerStatus);
                        document.getElementById(`${prop.server_name}_power`).disabled = false;
                        checkServer();
                    }
                }).catch(() => {
                    clearInterval(checkPowerStatus);
                    setStatus(keepStatus);
                    appendLog({method:'error', data:['failed to switch power of the server.']})
                    document.getElementById(`${prop.server_name}_power`).disabled = false;

                });
            }, 1000);
        }).catch(e => {
            setTimeout(e => { // For the visual effect.
                if (e?.code === 403) {
                    appendLog({method:'error', data:['failed to switch power of the server, login required']})
                } else {
                    appendLog({method:'error', data:['failed to switch power of the server.']})
                }
                setStatus(keepStatus);
                document.getElementById(`${prop.server_name}_power`).disabled = false;
            }, 100);
        });
    }

    return (
        <li >
            <div className={`py-2 inline cursor-pointer status ${status ? 'open' : 'dead'}`}
                id={prop.server_name}
                onClick={handleClickEvent}>
                {prop.server_name}
            </div>
            {/* {isAuthenticationValid() && */
            (
            <div className="py-2 inline toggle-wrapper float-right">
                <input type="checkbox" id={`${prop.server_name}_power`}  className="switch_body" checked={status ? true : false } />
                <label for="switch" className="switch_label" onClick={handleSwitchClickEvent}>
                    <span className="onf_btn"></span>
                </label>
            </div>
            )}
            {isOpened && (
                <div className='console' id='console'>
                    <Console logs={logs} variant="light" />
                    {/* {isAuthenticationValid() && */ (
                    <div className='prompt'>
                        <div className='prompt-cursor'/>
                            <form onSubmit={onPrompt} className='w100'>
                            {isLoading ? (
                                <div className='loading'/>
                            ) : (
                                <input className='prompt-field' type='text' tabIndex='-1' id='prompt_field' disabled={!status ? true : false}/>
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