import { api } from "@/lib/axios"

export const meetiApi = {
  createMeeti: async data => {
    return await api.post('/meeti', data)
  }
} 