import axios from 'axios'
import {apiUrl} from './constats'

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/users/register`, {
      name,
      email,
      password,
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/users/login`, {
      email,
      password,
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get(`${apiUrl}/api/users/user`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateProfile = async ({ token, userData, userId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(`${apiUrl}/api/users/updateUser/${userId}`, userData, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.put(`${apiUrl}/api/users/updateUserAvatar`, formData, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
