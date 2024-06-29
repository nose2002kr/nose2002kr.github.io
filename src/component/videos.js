import { useState, useEffect } from 'react';
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
      {videos !== null &&
        videos.map((project, index) => (
        <div key={index} className="mb-4">
          <Tooltip title={project.description}>
            <h2 className="text-xl font-bold fit-width">{project.project_name}</h2>
          </Tooltip>
          <div className="bg-gray-200 p-4 mb-2">
          <iframe width="100%" height="300px"
           title={project.project_name} src={project.video_link} 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           referrerPolicy="strict-origin-when-cross-origin"
           allowFullScreen></iframe>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Videos