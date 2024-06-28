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
            {prop?.name && (
                <div className='avatar-github'>
                    <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png'
                        className='avatar-github-ci vertical-center'
                        alt='github'/>
                    <span className='vertical-center'>
                        nose2002kr
                    </span>
                </div>
            )}
        </div>
    )
};

export default Avatar