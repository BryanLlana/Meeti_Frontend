import { api } from "@/lib/axios";

export const commentApi = {
  createComment: async (id, data) => {
    return await api.post(`/comments/${id}`, data)
  }
}