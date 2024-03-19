import { commentApi } from "@/api/commentApi"
import { defineStore } from "pinia"
import { ref, inject } from 'vue'

export const useCommentStore = defineStore('comment', () => {
  const toast = inject('toast')
  const errorInput = ref({})
  const message = ref('')
  const comments = ref([])
  const createComment = async (id) => {
    errorInput.value = {}
    if (message.value === '') errorInput.value.message = 'El comentario está vacío'

    if (Object.values(errorInput.value).length === 0) {
      try {
        const { data } = await commentApi.createComment(id, {message: message.value}) 
        const { meeti, ...values } = data
        comments.value.push(values)
        toast.open({
          message: 'Comentario guardado correctamente',
          type: 'success'
        })
        message.value = ''
      } catch (error) {
        console.log(error)
      }
    }
  }


  return {
    createComment,
    message,
    comments,
    errorInput
  }
})