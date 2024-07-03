import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

import './videos.css';
import { get_videos } from '../api';

const Videos = () => {
    const [videos, setVideos] = useState(null);
    useEffect(() => {
        get_videos()
        .then((e) => setVideos(e))
        .catch((e) => console.log("failed to fetch video lists: " + e));
    }, []);

  return(
    <div>
      <h1>Project</h1>
      {videos !== null ?
        videos.map((project, index) => (
        <div key={index} className="text_align_left">
          <Tooltip title={project.description}>
            <h2 className="text-xl font-bold fit-width">{project.project_name}</h2>
          </Tooltip>
          <iframe 
           className='video'
           title={project.project_name} src={project.video_link} 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           referrerPolicy="strict-origin-when-cross-origin"
           allowFullScreen/>
        </div>
      )) : (<div>loading...</div>)}
      <div id='page'>
        <div className='circle_10px gray'/>
      </div>
    </div>
  )
};

export default Videos