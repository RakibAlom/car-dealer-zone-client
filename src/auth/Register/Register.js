import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useToken from '../../hooks/useToken/useToken';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUserRegister, updateUser } = useContext(AuthContext);
  const [inputError, setInputError] = useState('')
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const handleRegister = (data) => {

    setInputError('');
    setDisabled(true)

    const avatar = data.avatar[0]
    const formData = new FormData();
    formData.append('image', avatar)
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          createUserRegister(data.email, data.password)
            .then(result => {
              const user = result.user;
              const currentUser = {
                uid: user.uid
              }

              // get jwt token
              fetch('https://car-dealer-zone-server.vercel.app/jwt', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
              })
                .then(res => res.json())
                .then(data => {
                  localStorage.setItem('access-token', data.token);
                });

              const userInfo = {
                displayName: data.name,
                photoURL: imgData.data.url,
              }
              updateUser(userInfo)
                .then(() => {
                  const userData = {
                    userType: data.userType,
                    name: data.name,
                    email: data.email,
                    avatar: imgData.data.url,
                    uid: user.uid,
                    verified: false
                  }
                  fetch('https://car-dealer-zone-server.vercel.app/user', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                      authorization: `bearer ${localStorage.getItem('access-token')}`
                    },
                    body: JSON.stringify(userData)
                  })
                    .then(res => res.json())
                    .then(result => {
                      console.log(result)
                      if (result.acknowledged) {
                        toast.success('Welcome to Car Dealer Zone!')
                        navigate('/')
                        setDisabled(false)
                      }
                    })
                })
                .catch(err => {
                  console.error(err)
                  setDisabled(false)
                  toast.error('Avatar have problem!')
                });
            }).catch(error => {
              console.error(error)
              setDisabled(false)
              setInputError(error.message);
              toast.error(error.message)
            })
        }
      })

  }

  return (
    <>
      <div className="bg-gray-100">
        <div className='container md:mx-auto py-10'>
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1609138313399-483a87777a39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')" }}></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <h1 className="text-3xl font-semibold text-gray-700 dark:text-white">Register</h1>

              {inputError &&
                <div className="alert alert-error shadow-lg rounded py-2 mt-4">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{inputError}</span>
                  </div>
                </div>}

              <form className="mt-6" onSubmit={handleSubmit(handleRegister)}>
                <div>
                  <label htmlFor="userType" className="block text-sm text-gray-800 dark:text-gray-200">Account Type</label>
                  <select {...register("userType", {
                    required: "User Type is Required"
                  })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    <option disabled>select account type</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                  {errors.userType && <p className='text-red-500'>{errors.userType.message}</p>}
                </div>

                <div className="mt-4">
                  <label htmlFor="name" className="block text-sm text-gray-800 dark:text-gray-200">Name</label>
                  <input type="text" {...register("name", {
                    required: "Name is Required"
                  })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                  {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                  <input type="email" {...register("email", {
                    required: "Email is Required"
                  })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                  {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="mt-4">
                  <label htmlFor="avatar" className="block text-sm text-gray-800 dark:text-gray-200">Avatar</label>
                  <input type="file" {...register("avatar", {
                    required: "Your avatar is Required"
                  })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                  {errors.avatar && <p className='text-red-500'>{errors.avatar.message}</p>}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                  </div>
                  <input type="password" {...register("password", {
                    required: "password is Required",
                    minLength: { value: 6, message: "Password must be 6 characters long" },
                    pattern: { value: /(?=.*[0-9])/, message: 'Password must have a number' }
                  })} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                  {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>

                <div className="mt-6">
                  <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:bg-gray-300" disabled={disabled}>
                    Register
                  </button>
                </div>

              </form>

              <SocialLogin></SocialLogin>

              <p className="mt-8 text-xs font-light text-center text-gray-400"> Already have an account? <Link to="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login</Link></p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;