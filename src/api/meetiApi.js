import { api } from "@/lib/axios"

export const meetiApi = {
  createMeeti: async data => {
    return await api.post('/meeti', data)
  },
  getMeetis: async () => {
    return await api.get('/meeti')
  },
  getMeeti: async id => {
    return await api.get(`/meeti/${id}`)
  },
  updateMeeti: async (id, data) => {
    return await api.patch(`/meeti/${id}`, data)
  }
} 