import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [votes, setVotes] = useState([]);
  let navigate = useNavigate();

  const handleOnSubmit = () => {
    const newUser = { username: username, password: password, votes: votes };
    axios
      .post('http://localhost:5000/users/add_user', newUser)
      .then((response) => {
        alert('Succesfully sign up to SubwayTalks');
        console.log(response);
        console.log(response.data);
      })
      .then(() => {
        navigate('/');
        window.location.reload();
      });
  };
  return (
    <section className="signup">
      <h1>Welcome to SubwayTalks website</h1>
      <form action="" className="signup-form">
        <img src="logo4.png" alt="" />
        <p>User Name:</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <p>Password:</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <br></br>
        <button
          type="submit"
          onClick={handleOnSubmit}
          className="submit-button"
        >
          Sign up
        </button>
        <br></br>
        <Link to="/sign-in">
          <p className="linkto">
            Already has account? Go to log in{' '}
            <ArrowForwardRoundedIcon fontSize="15px" />
          </p>
        </Link>
        <Link to="/">
          <p className="linkto">
            Log in as guest <ArrowForwardRoundedIcon fontSize="15px" />
          </p>
        </Link>
      </form>
    </section>
  );
}

export default Signup;
