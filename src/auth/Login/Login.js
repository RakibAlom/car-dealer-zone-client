import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn } = useContext(AuthContext)
  const [loginError, setLoginError] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = data => {

    setLoginError('');
    signIn(data.email, data.password)
      .then(res => {
        const user = res.user;
        const currentUser = {
          uid: user.uid
        }
        // get jwt token
        fetch('http://localhost:5000/jwt', {
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
            toast.success(`Welcome ${user.displayName}`)
          });
      })
      .catch(error => {
        console.log(error.message)
        setLoginError(error.message);
        toast.error(error.message);
      });
  }

  return (
    <div className='container md:mx-auto my-10'>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555695232-57d88cacdfa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')" }}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-white">Login</h1>

          {loginError &&
            <div className="alert alert-error shadow-lg rounded py-2 mt-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{loginError}</span>
              </div>
            </div>}

          <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
              <input type="text" {...register('email', {
                required: "Email Required"
              })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                <Link className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
              </div>

              <input type="password" {...register("password", {
                required: "password is Required",
              })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
          </form>

          <SocialLogin></SocialLogin>

          <p className="mt-8 text-xs font-light text-center text-gray-400"> Can't have an account? <Link to="/register" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Register</Link></p>

        </div>
      </div>
    </div>
  );
};

export default Login;