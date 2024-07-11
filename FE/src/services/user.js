import { http } from '~/utils/http'

const signUp = async ({ name, email, password }) => {
  try {
    // data trong data cua axios
    const { data } = await http.post('/users/register', {
      name,
      email,
      password
    })
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const signIn = async ({ email, password }) => {
  try {
    const { data } = await http.post('/users/login', { email, password })
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const forgotPassword = async ({ email }) => {
  try {
    const { data } = await http.post('/users/forgot-password', { email })
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const resetPassword = async ({ password, confirmPassword, id, token }) => {
  try {
    const { data } = await http.post(`/users/reset-password/${id}/${token}`, { password, confirmPassword })
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getUserProfile = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
      }
    }
    const { data } = await http.get('/users/profile', config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const updateProfile = async ({ token, email, name }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put(
      '/users/updateProfile',
      {
        email,
        name
      },
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put('/users/updateProfilePicture', formData, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const deleteUser = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.delete(`/users/${userId}`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getAllUsers = async ({ token, search = '', page = 1, limit = 3 }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data, headers } = await http.get(`/users?search=${search}&page=${page}&limit=${limit}`, config)
    return { data, headers }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const updateUserAdmin = async ({ userId, admin, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put(`/users/${userId}`, { admin }, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getImage = async ({ token, masv }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.post(
      `https://uis.ptithcm.edu.vn/api/sms/w-locthongtinimagesinhvien?MaSV=${masv}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
export {
  signUp,
  signIn,
  getUserProfile,
  updateProfile,
  updateProfilePicture,
  forgotPassword,
  resetPassword,
  deleteUser,
  getAllUsers,
  updateUserAdmin,
  getImage
}
