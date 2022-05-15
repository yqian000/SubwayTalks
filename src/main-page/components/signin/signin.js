import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleOnSubmit = () => {
    const checkUser = { username: username, password: password };
    axios
      .get('http://localhost:5000/users/findUser', checkUser)
      .then(function (response) {
        alert('Succesfully log in to SubwayTalks');
        console.log(response.data);
        navigate('/');
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
          Log in
        </button>
      </form>
    </>
  );
}

export default Signin;
