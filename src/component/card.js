import React from 'react';

import './card.css'
import Servers from './servers';
import TechStack from './tech-stack';
import Videos from './videos';
import Avatar from './avatar';
import MostLanguage, { Top3Language } from './most-lang';

const publicUrl = process.env.PUBLIC_URL;

const Card = () => {

    return (
        <div className='frame' id='frame'>
            <div className='panel upper_panel'>
                <div className='menu_decorator'> 
                <div className='left_gravity'>
                    <div className='circle_10px red'/>
                    <div className='circle_10px white'/>
                </div>
                <div className='right_gravity'>
                    <div className='mini_slide_switch'/>
                    <div className='circle_13px red'/>
                    <div className='circle_13px blue'/>
                </div>
                </div>
                
                <li className='menu'>
                    <ul>About Me</ul>
                    <ul>Tech</ul>
                    <ul>Project</ul>
                    <ul>Server</ul>
                </li>
                <div className='photo' style={{ backgroundImage: `url(${publicUrl}/banner.png)`}}/>
                <div className='about_me'>
                    <div className='left'>
                        <div className='title'>About Me</div>
                        <div className='content'>
                            Hi Hi Hi Welcome, welcome everyone
                        </div>
                    </div>
                    <div className='title title_name'>Kyoung Sub</div>
                </div>
            </div>

            <div className='panel card_panel margin_top'>
            <div className='card night' id='most_top_lang'>
                <MostLanguage/>
            </div>
            <div className='card begie' id='most_3_lang'>
                <Top3Language/>
            </div>
            <div className='card row_span night' id='tech_stack'>
                <TechStack/>
            </div>
            
            <div className='card col_span' id='trend'>
            </div>
            <div className='card begie' id='profile'>
                <Avatar name='true'/>
            </div>
            <div className='card col_span row_span night' id='project'>
                <Videos/>
            </div>
            <div className='card empty_card' id='empty'></div>
            <div className='card col_span_2 night' id='server'>
                <Servers/>
            </div>
            </div>
        </div>
    );
}

export default Card
