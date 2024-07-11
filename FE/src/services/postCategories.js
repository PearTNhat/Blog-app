import { http } from '~/utils/http'

const getAllPostCategories = async ({ search = '', page = 1, limit = 3 }) => {
  try {
    const { data, headers } = await http.get(`/post-categories?search=${search}&page=${page}&limit=${limit}`)
    return { data, headers }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const deletePostCategory = async (categoryId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.delete(`/post-categories/${categoryId}`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const createCategory = async (title, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.post(`/post-categories`, { title }, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getSingleCategory = async ({ categoryId }) => {
  try {
    const { data } = await http.get(`/post-categories/${categoryId}`)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const updateCategory = async ({ categoryId, title, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put(`/post-categories/${categoryId}`, { title }, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
export { getAllPostCategories, deletePostCategory, createCategory, getSingleCategory, updateCategory }
