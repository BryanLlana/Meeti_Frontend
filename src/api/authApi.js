import { api } from "@/lib/axios"

export const authApi = {
  register: async data => {
    return await api.post('/auth/register', data)
  },
  login: async data => {
    return await api.post('auth/login', data)
  },
  private: async () => {
    return await api.get('/auth/private')
  },
  updateUser: async data => {
    return await api.post('/auth/edit-profile', data)
  },
  uploadImage: async image => {
    return await api.post('/files/profile', image)
  },
  updateImage: async (imageName, image) => {
    return await api.patch(`/files/profile/${imageName}`, image)
  },
  getUser: async id => {
    return await api.get(`/auth/user/${id}`)
  }
}