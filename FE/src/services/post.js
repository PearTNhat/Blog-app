import { http } from '~/utils/http'

const getAllPosts = async ({ search = '', page = 1, limit = 3, category = '' }) => {
  try {
    const { data, headers } = await http.get(`posts?search=${search}&page=${page}&limit=${limit}&category=${category}`)
    return { data, headers }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await http.get(`/posts/${slug}`)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.delete(`/posts/${slug}`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const updatePost = async ({ slug, token, updatePostData }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put(`/posts/${slug}`, updatePostData, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.post('/posts', {}, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
export { getAllPosts, getSinglePost, deletePost, updatePost, createPost }
