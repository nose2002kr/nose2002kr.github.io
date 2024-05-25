import {useNavigate} from 'react-router-dom';
import "./login.css";
import {post_login} from '../api.js';

import { useAuth } from '../context/AuthContext.js';
import { useCard } from '../context/CardContext.js';

const Signin = () => {
  const { setIsAuthenticated } = useAuth();
  const { rewind } = useCard();
  const navigate = useNavigate();
  let HandleSubmit = e => {
    
    e.preventDefault();
    e.stopPropagation();

    post_login(
      e.target.username.value,
      e.target.password.value
    )
    .then(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate.push('/');
    })
    .catch(() => alert('로그인 실패'));
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
      <h4>Login</h4>
      <form onSubmit={HandleSubmit}>
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
  )
}

export default Signin;