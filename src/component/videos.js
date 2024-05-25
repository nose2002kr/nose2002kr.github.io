import { useState, useEffect } from 'react';
import './videos.css';
import { get_videos } from '../api';

const Videos = () => {
    const [videos, setVideos] = useState(null);
    useEffect(() => {
        get_videos()
        .then((e) => setVideos(e))
        .catch(console.log("failed to fetch video lists"));
    }, []);

  return(
    <div>
      {videos !== null &&
        videos.map((project, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-bold">{project.project_name}</h2>
          <div className="bg-gray-200 p-4 mb-2">
          <iframe width="100%" height="300px" title={project.project_name} src={project.video_link} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Videos