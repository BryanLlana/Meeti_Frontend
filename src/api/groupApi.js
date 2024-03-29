import { api } from "@/lib/axios"

export const groupApi = {
  uploadImage: async image => {
    return await api.post('/files/group', image)
  },
  createGroup: async data => {
    return await api.post('/group', data)
  },
  findGroups: async () => {
    return await api.get('/group')
  },
  findGroup: async id => {
    return await api.get(`/group/${id}`)
  },
  findGroupPublic: async id => {
    return await api.get(`/group/public/${id}`)
  },
  updateGroup: async (id, data) => {
    return await api.patch(`/group/${id}`, data)
  },
  updateImage: async (imageName, image) => {
    return await api.patch(`/files/group/${imageName}`, image)
  },
  deleteGroup: async (id) => {
    return await api.delete(`/group/${id}`)
  }
}