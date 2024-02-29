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
  }
}