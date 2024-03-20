import { api } from "@/lib/axios";

export const commentApi = {
  createComment: async (id, data) => {
    return await api.post(`/comments/${id}`, data)
  },
  getComments: async (id) => {
    return await api.get(`/comments/${id}`)
  },
  deleteComment: async (id) => {
    return await api.delete(`/comments/${id}`)
  }
}