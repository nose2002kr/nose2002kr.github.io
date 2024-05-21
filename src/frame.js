import React, { useState } from 'react';
import './frame.css';


const Frame = () => {
    const [activeContent, setActiveContent] = useState('whoiam');
    const [serverStatus, setServerStatus] = useState({
        server1: true,
        server2: true,
    });

    const showContent = (id) => {
        setActiveContent(id);
    };

    const toggleServerStatus = (server) => {
        setServerStatus((prevStatus) => ({
            ...prevStatus,
            [server]: !prevStatus[server],
        }));
    };

    const publicUrl = process.env.PUBLIC_URL;

    return (
        <div className="card">
        <div className="text-gray-800 height-inherity">
            <div className="container mx-auto height-inherity">
                <header className="flex items-center justify-between p-4 py-4 header">
                    <div className="text-3xl font-bold ml-1">KyoungSub</div>
                    <div className="height-inherity"><img className="logo" src={`${publicUrl}/character.webp`}/></div>
                </header>
                <div className="flex height-inherity shadow-2">
                    <nav className="w-1/4 bg-pastel-100">
                        <ul>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 category"
                                onClick={() => showContent('whoiam')}
                            >
                                <b>Who I am</b>
                            </li>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 category"
                                onClick={() => showContent('video')}
                            >
                                <b>Projects</b>
                            </li>
                            <li
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100 category"
                                onClick={() => showContent('servers')}
                            >
                                <b>Servers</b>
                            </li>
                        </ul>
                    </nav>
                    <main className="w-3/4 p-4">
                        {activeContent === 'whoiam' && (
                            <div id="whoiam" className="content">
                                <p>blahblahblah blahblahblah blahblahblah</p>
                            </div>
                        )}
                        {activeContent === 'video' && (
                            <div id="video" className="content">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">Project1</h2>
                                    <div className="bg-gray-200 p-4 mb-2">youtube</div>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold">Project2</h2>
                                    <div className="bg-gray-200 p-4 mb-2">youtube</div>
                                </div>
                                {/* <div className="flex justify-center">
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((number) => (
                                            <span key={number} className="cursor-pointer">{number}</span>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        )}
                        {activeContent === 'servers' && (
                            <div id="servers" className="content">
                                <ul>
                                    <li
                                        className="py-2 flex items-center cursor-pointer"
                                        onClick={() => toggleServerStatus('server1')}
                                    >
                                        <span
                                            className={`w-3 h-3 rounded-full mr-2 ${serverStatus.server1 ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                        Server 1
                                    </li>
                                    <li
                                        className="py-2 flex items-center cursor-pointer"
                                        onClick={() => toggleServerStatus('server2')}
                                    >
                                        <span
                                            className={`w-3 h-3 rounded-full mr-2 ${serverStatus.server2 ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                        Server 2
                                    </li>
                                </ul>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Frame;