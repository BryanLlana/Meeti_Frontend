import { api } from "@/lib/axios"

export const authApi = {
  register: async data => {
    return await api.post('/auth/register', data)
  }
}