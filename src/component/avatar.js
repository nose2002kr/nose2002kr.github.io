import './avatar.css'

const Avatar = (prop) => {
    return (
        <div className='avatar-frame'>
            <img
                src='https://avatars.githubusercontent.com/u/52348275?v=4'
                className='avatar-user'
                alt='avatar'
                onClick={()=>window.location.href='https://github.com/nose2002kr'}
            />
            <div className='avatar-desc'>
                <div>
                    <span className='card-title left_gravity'>Profile</span>
                </div>
                <div>
                    <div className='left_gravity no-text-wrap'>
                        <img 
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png'
                            className='avatar-github-ci vertical-center'
                            alt='github'/>
                        <span className='vertical-center'>nose2002kr</span>
                    </div>
                    <div className='left_gravity no-text-wrap'>
                    <img 
                        src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'
                        className='avatar-github-ci vertical-center'
                        alt='github'/>
                    <span className='vertical-center'>경섭 이</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Avatar