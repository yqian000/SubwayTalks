import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/signin.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignInPage() {
  let navigate = useNavigate();

  const SigninSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      const checkUser = {
        username: values.username,
        password: values.password,
      };
      axios
        .post('https://subway-talks.herokuapp.com/users/findUser', checkUser)
        .then(function (response) {
          //console.log(response.data);
          alert('Successfully log in to SubwayTalks');
          navigate(`/main/logged-in-as?${response.data.username}`, {
            state: {
              username: response.data.username,
              userId: response.data._id,
            },
          });
        })
        .catch(function (error) {
          console.log(JSON.stringify(error));
          let isValidUsername = error.toString().includes('404');
          if (isValidUsername === true) {
            alert('Username or password did not match, please enter again!');
            navigate('/sign-in');
          } else {
            alert('Something went wrong, please try again!');
            navigate('/sign-in');
          }
        });
    },
  });
  return (
    <section className="mt-5">
      <h2 className="title">Welcome to SubwayTalks website</h2>
      <div className="container col-md-5">
        <div className="card p-5 shadow-lg bg-white rounded">
          <div className="row">
            <div className="col-12 align-self-center">
              <img src="logo4.png" alt="" className="img" />
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Form>
              <br></br>
              <Link to="/sign-up" className="link">
                <p className="linkto">
                  New user? Go to sign up{' '}
                  <ArrowForwardRoundedIcon fontSize="15px" />
                </p>
              </Link>

              <Link
                to="/main/logged-in-as?guest"
                className="link"
                state={{
                  username: '',
                  userId: '',
                }}
              >
                <p className="linkto">
                  Log in as guest <ArrowForwardRoundedIcon fontSize="15px" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
