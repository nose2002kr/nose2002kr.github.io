import React from 'react';

import './avatar.css'

const Avatar = (prop) => {
    return (
        <div className='avatar_frame'>
            <img
                src='https://avatars.githubusercontent.com/u/52348275?v=4'
                className='avatar_user'
                alt='avatar'
                onClick={()=>window.location.href='https://github.com/nose2002kr'}
            />
            <div className='avatar_desc'>
                <div>
                    <span className='card_title left_gravity'>Profile</span>
                </div>
                <div>
                    <div className='left_gravity no_text_wrap margin_bottom_small'>
                        <img 
                            src='https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg'
                            className='avatar_github_ci vertical_center'
                            alt='github'/>
                        <a href='https://nose2002kr.notion.site/KSKS-49ef8cf291cc4f63a776d39afc3990be?pvs=74'>
                            <span className='vertical_center'>KSKS</span>
                        </a>
                    </div>
                    

                    <div className='left_gravity no_text_wrap margin_bottom_small'>
                        <img 
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png'
                            className='avatar_github_ci vertical_center'
                            alt='github'/>
                        <a href='https://github.com/nose2002kr'>
                            <span className='vertical_center'>nose2002kr</span>
                        </a>
                    </div>
                    <div className='left_gravity no_text_wrap margin_bottom_small'>
                        <img 
                            src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'
                            className='avatar_github_ci vertical_center'
                            alt='linkedin'/>
                        <a href='https://www.linkedin.com/in/%EA%B2%BD%EC%84%AD-%EC%9D%B4-678716301/'>
                            <span className='vertical_center'>경섭 이</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Avatar