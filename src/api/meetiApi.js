import { api } from "@/lib/axios"

export const meetiApi = {
  createMeeti: async data => {
    return await api.post('/meeti', data)
  },
  registerUserMeeti: async id => {
    return await api.post(`/meeti/confirmar-asistencia/${id}`)
  },
  getMeetis: async () => {
    return await api.get('/meeti')
  },
  getMeeti: async id => {
    return await api.get(`/meeti/${id}`)
  },
  updateMeeti: async (id, data) => {
    return await api.patch(`/meeti/${id}`, data)
  },
  deleteMeeti: async id => {
    return await api.delete(`/meeti/${id}`)
  },
  getAllMeetis: async (limit = 0) => {
    return await api.get(`/meeti/public?limit=${limit}`)
  },
  getAllMeeti: async id => {
    return await api.get(`/meeti/public/${id}`)
  }
} 