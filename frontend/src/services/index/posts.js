import axios from 'axios'
import {apiUrl} from './constats'

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/posts/`)

    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getSinglePost = async slug => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/posts/${slug}`)

    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
