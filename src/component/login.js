import { post_login } from '../api.js';
import { NotificationManager } from 'react-notifications';
import "./login.css";

import { isAuthenticationValid, useAuth } from '../context/AuthContext.js';
import { useCard } from '../context/CardContext.js';

const Signin = () => {
  const { setAuthentication } = useAuth();
  const { rewind } = useCard();
  let HandleSubmit = e => {
    
    e.preventDefault();
    e.stopPropagation();

    post_login(
      e.target.username.value,
      e.target.password.value
    )
    .then((token) => {
      setAuthentication(token);
      gotoBack();
      NotificationManager.info('로그인 되었습니다.')
    })
    .catch((e) => {
      NotificationManager.error('로그인 정보가 올바르지 않습니다.')
      console.log(e)
    });
  };
  
  let HandleLogout = e => {
    setAuthentication(null);
    gotoBack();
  };
  
  const gotoBack = () => {
    rewind();
  };

  return (
    <div className="container" style={{opacity:"0"}}>
      <svg className="back" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={gotoBack} cursor="pointer">
        <g data-name="Layer 2"> <g data-name="arrow-ios-back">
        <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
        <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"/>
        </g> </g>
      </svg>
      {!isAuthenticationValid() ? (
        <div>
      <h4>Login</h4>
      <form className="loginForm" onSubmit={HandleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            className="text_input"

          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            className="text_input"

          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn"

        />
      </form>
      </div>
      ) : (
        <div>
          <input
            type="submit"
            value="Logout"
            className="btn"
            onClick={HandleLogout}

          />
        </div>
      )}
    </div>
  )
}

export default Signin;