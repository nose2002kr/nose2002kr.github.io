import React, { useState, useEffect } from 'react';

import Server from './server';
import { get_servers } from '../api';

const Servers = () => {
    const [servers, setServers] = useState(null);
    useEffect(() => {
        get_servers()
        .then((e) => setServers(e))
        .catch(console.log("failed to fetch server list"));
    }, []);
    
    return (
    <ul>
        {
            servers !== null &&
            servers.map((server, index) => (
            <Server prop={server} />
            ))
        }
    </ul>
    )
}

export default Servers