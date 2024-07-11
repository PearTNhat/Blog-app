import { http } from '~/utils/http'

const createComment = async ({ desc, slug, parentId, replyOnUser, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.post(
      '/comments',
      {
        desc,
        slug,
        parentId,
        replyOnUser
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
const updateComment = async ({ desc, check, commentId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.put(
      `/comments/${commentId}`,
      {
        desc,
        check
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
const deleteComment = async ({ commentId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await http.delete(`/comments/${commentId}`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
const getAllComments = async ({ token, search = '', page = 1, limit = 3 }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const { data, headers } = await http.get(`comments?search=${search}&page=${page}&limit=${limit}`, config)

    return { data, headers }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    }
    throw new Error(error.message)
  }
}
export { createComment, updateComment, deleteComment, getAllComments }
