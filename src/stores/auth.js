import { authApi } from "@/api/authApi"
import { defineStore } from "pinia"
import { reactive, ref, inject } from 'vue'
import { useRouter } from "vue-router"

export const useAuthStore = defineStore('auth', () => {
  const toast = inject('toast')
  const router = useRouter()
  const inputError = ref({})
  const user = reactive({
    email: '',
    name: '',
    password: '',
    image: '',
    password2: ''
  })

  const register = async () => {
    inputError.value = {}

    if (user.email === '') inputError.value.email = 'El email es obligatorio'
    if (user.name === '') inputError.value.name = 'El nombre es obligatorio'
    if (user.password === '') inputError.value.password = 'El password es obligatorio'
    if (user.password !== user.password2) inputError.value.password = 'Los password no son iguales'

    if (Object.values(inputError.value).length === 0) {
      try {
        const { password2, image, ...values } = user
        const { data } = await authApi.register(values)
        localStorage.setItem('authToken', data.token)
        Object.assign(user, {
          email: '',
          name: '',
          password: '',
          image: '',
          password2: ''
        })
        toast.open({
          message: 'Usuario registrado correctamente',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        const err = error.response.data.message
        if (typeof err === 'object') {
          toast.open({
            message: 'Password no seguro',
            type: 'error'
          })
        } else {
          toast.open({
            message: err,
            type: 'error'
          })
        }
      }
    }
  }

  return {
    user, 
    register,
    inputError
  }
})