import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { signup } from '../../services/index/users'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/reducers/userReducers.js'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const password = watch('password')

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      dispatch(userActions.setUserInfo(data))
      localStorage.setItem('account', JSON.stringify(data))
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const submitHandler = data => {
    const { name, email, password } = data
    mutate({ name, email, password })
  }
  useEffect(() => {
    if (userState.userInfo) {
      navigate('/')
    }
  }, [navigate, userState.userInfo])

  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
          <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='name'
                className='text-[#5a7184] font-semibold block'>
                Name
              </label>
              <input
                {...register('name', {
                  minLength: {
                    value: 1,
                    message: 'Name must be at least 1 character',
                  },
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
                type='text'
                id='name'
                placeholder='Enter Name'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 rounded-lg font-semibold block outline-none border ${
                  errors.name ? 'border-red-500' : 'border-[#c3cad9]'
                } `}
              />
              {errors.name?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='email'
                className='text-[#5a7184] font-semibold block'>
                Email address
              </label>
              <input
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
                type='text'
                id='email'
                placeholder='Enter Email'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 rounded-lg font-semibold block outline-none border ${
                  errors.email ? 'border-red-500' : 'border-[#c3cad9]'
                } `}
              />
              {errors.email?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='password'
                className='text-[#5a7184] font-semibold block'>
                Password
              </label>
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type='password'
                id='password'
                placeholder='Enter Password'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 rounded-lg font-semibold block outline-none border ${
                  errors.password ? 'border-red-500' : 'border-[#c3cad9]'
                } `}
              />
              {errors.password?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='confirm-password'
                className='text-[#5a7184] font-semibold block'>
                Confirm Password
              </label>
              <input
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Confirm Password is required',
                  },
                  validate: value => {
                    if (value !== password) {
                      return 'Passwords do not match'
                    }
                  },
                })}
                type='password'
                id='confirm-password'
                placeholder='Confirm Your Password'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 rounded-lg font-semibold block outline-none border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#c3cad9]'
                } `}
              />
              {errors.confirmPassword?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              disabled={!isValid || isPending}
              className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:cursor-not-allowed disabled:opacity-70'>
              Register
            </button>
            <p className='text-sm font-semibold text-[#5a7184]'>
              You have an account?{' '}
              <Link to='/login' className='font-bold text-primary'>
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default RegisterPage
