import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const OtherLoginSystem = () => {
  const { signInWithProvider } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithProvider(googleProvider)
      .then(res => {
        const user = res.user;
        const currentUser = {
          uid: user.uid
        }
        // get jwt token
        fetch('https://justice-lawyer-server.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('access-token', data.token);
            navigate(from, { replace: true });
            toast.success('Welcome, you connected with Google!');
          });

      }).catch(error => {
        console.error(error)
        toast.error(error.message)
      });
  }
  const handleGithubSignIn = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithProvider(githubProvider)
      .then(res => {
        const user = res.user;
        const currentUser = {
          uid: user.uid
        }
        // get jwt token
        fetch('https://justice-lawyer-server.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('access-token', data.token);
            navigate(from, { replace: true });
            toast.success('Welcome, you connected with GitHub!');
          });

      }).catch(error => {
        console.error(error)
        toast.error(error.message)
      })

  }


  return (
    <div>
      <Row>
        <Col md="12" lg="6">
          <Button onClick={handleGoogleSignIn} className='w-100 border fw-semibold rounded-0' variant="light" type="submit">
            <FaGoogle></FaGoogle> Connect with Google
          </Button>
        </Col>
        <Col md="12" lg="6" className='pt-3 pt-lg-0'>
          <Button onClick={handleGithubSignIn} className='w-100 border fw-semibold rounded-0' variant="dark" type="submit">
            <FaGithub></FaGithub> Connect with Github
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default OtherLoginSystem;