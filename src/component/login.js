import {useNavigate} from 'react-router-dom';
import "./login.css";
import {login} from '../api.js';

const Signin = () => {
  const navigate = useNavigate();

    let HandleSubmit = e => {
      const nav = navigate;
    
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
      
      login(
        e.target.username.value,
        e.target.password.value
      )
      .then(() => nav("/frame"))
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