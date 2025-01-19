import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserProfile, updateProfile } from '../../services/index/users'

import MainLayout from '../../components/MainLayout'
import ProfilePicture from '../../components/ProfilePicture'
import { userActions } from '../../store/reducers/userReducers'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector(state => state.user)
  const QueryClient = useQueryClient()

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token })
    },
    queryKey: ['profile'],
    onError: error => {
      toast.error(error.message || 'Failed to fetch profile')
      toast.error(profileError)
    },
  })

  const { mutate, isPending, updateProfileIsLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: data => {
      dispatch(userActions.setUserInfo(data))
      localStorage.setItem('account', JSON.stringify(data))
      QueryClient.invalidateQueries(['profile'])
      toast.success('Profile updated successfully')
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    values: {
      name: profileIsLoading ? '' : profileData.name,
      email: profileIsLoading ? '' : profileData.email,
    },
    mode: 'onChange',
  })

  const submitHandler = ({ name, email, password }) => {
    mutate({ token: userState.userInfo.token, userData: { name, email, password }, userId: userState.userInfo._id })
  }
  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/')
    }
  }, [navigate, userState.userInfo])

  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col my-6 w-full'>
              <label htmlFor='name' className='text-[#5a7184] font-semibold block'>
                Name
              </label>
              <input
                {...register('name', {
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 character',
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
              {errors.name?.message && <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label htmlFor='email' className='text-[#5a7184] font-semibold block'>
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
              {errors.email?.message && <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label htmlFor='password' className='text-[#5a7184] font-semibold block'>
                New Password
              </label>
              <input
                {...register('password')}
                type='password'
                id='password'
                placeholder='Enter New Password'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 px-5 py-4 rounded-lg font-semibold block outline-none border ${
                  errors.password ? 'border-red-500' : 'border-[#c3cad9]'
                } `}
              />
              {errors.password?.message && <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>}
            </div>
            <button
              type='submit'
              disabled={!isValid || profileIsLoading || isPending || updateProfileIsLoading}
              className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:cursor-not-allowed disabled:opacity-70'>
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default ProfilePage
