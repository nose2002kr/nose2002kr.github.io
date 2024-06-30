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
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png'
                            className='avatar_github_ci vertical_center'
                            alt='github'/>
                        <span className='vertical_center'>nose2002kr</span>
                    </div>
                    <div className='left_gravity no_text_wrap margin_bottom_small'>
                    <img 
                        src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'
                        className='avatar_github_ci vertical_center'
                        alt='linkedin'/>
                    <span className='vertical_center'>경섭 이</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Avatar