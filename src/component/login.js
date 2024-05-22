import {useNavigate} from 'react-router-dom';
import "./login.css";
import {post_login} from '../api.js';

import { useAuth } from '../AuthContext.js';

const Signin = () => {
  const { setIsAuthenticated } = useAuth();
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
  
  return (
    <div className="login">
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