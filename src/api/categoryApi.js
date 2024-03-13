import { api } from '@/lib/axios'

export const categoryApi = {
  getCategories: async () => {
    return await api.get('/category')
  },
  getCategory: async id => {
    return await api.get(`/category/${id}`)
  }
}