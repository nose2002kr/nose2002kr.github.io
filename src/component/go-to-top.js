import React from 'react'
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import './go-to-top.css';

const GoToTop = () => {
	return (
        <div className='go_to_top'>
			<Fab size="small" href='#' >
			<ArrowUpwardIcon/>
			</Fab>
        </div>
	);
}

export default GoToTop;