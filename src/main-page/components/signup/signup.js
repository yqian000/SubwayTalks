import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <>
      <h1>Welcome to SubwayTalks website</h1>
      <form action="">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          Sign up
        </button>
      </form>
    </>
  );
}

export default Signup;
