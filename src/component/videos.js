import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

import './videos.css';
import './error.css';
import { get_videos } from '../api';

const Videos = () => {
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState(null);
    useEffect(() => {
        get_videos()
        .then((e) => setVideos(e))
        .catch((e) => {
          console.log("failed to fetch video lists: " + e);
          setError(true);
        });
    }, []);

  if (error) { 
    return (
      <div className='h100'>
      <h1 className='h0'>Project</h1>
        <Tooltip title="프로젝트 목록을 표시하는데.. 에러가 발생헀어요.." followCursor>
          <div className="error-desc"/>
        </Tooltip>
      </div>
    )
  }

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