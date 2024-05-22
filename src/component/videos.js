import { useState, useEffect } from 'react';
import { get_videos } from '../api';

const Videos = () => {
    const [videos, setVideo] = useState(null);
    useEffect(() => {
        get_videos().then((e) => setVideo(e)).catch(console.log("failed to fetch video lists"));
    });

  return(
    <></>
  )
};

export default Videos