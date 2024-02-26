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
  } 
}