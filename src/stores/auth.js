import { authApi } from "@/api/authApi"
import { defineStore } from "pinia"
import { reactive, ref, inject } from 'vue'
import { useRouter } from "vue-router"

export const useAuthStore = defineStore('auth', () => {
  const toast = inject('toast')
  const router = useRouter()
  const inputError = ref({})

  const userAuth = ref({})
  const user = reactive({
    email: '',
    name: '',
    password: '',
    image: '',
    password2: ''
  })

  const loginUser = reactive({
    email: '',
    password: ''
  })

  const profile = reactive({
    name: '',
    description: '',
    email: '',
    image: ''
  })

  const imageNow = ref('')
  const userOne = ref({})

  const getUserAuth = async () => {
    try {
      const { data } = await authApi.private()
      userAuth.value = data.user
      profile.name = data.user.name
      profile.email = data.user.email
      profile.description = data.user.description
      profile.image = data.user.image
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async id => {
    try {
      const {data} = await authApi.getUser(id)
      userOne.value = data
    } catch (error) {
      console.log(error)
      router.push({ name: 'admin'})
    }
  }

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
        router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
        const err = error.response.data.message
        if (typeof err === 'object') {
          toast.open({
            message: 'Password no seguro, debe tener una mayúscula y un número',
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

  const login = async () => {
    inputError.value = {}

    if (loginUser.email === '') inputError.value.email = 'El email es obligatorio'
    if (loginUser.password === '') inputError.value.password = 'El password es obligatorio'

    if (Object.values(inputError.value).length === 0) {
      try {
        const { data } = await authApi.login(loginUser)
        localStorage.setItem('authToken', data.token)
        Object.assign(loginUser, {
          email: '',
          password: ''
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
        toast.open({
          message: error.response.data.message,
          type: 'error'
        })
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    userAuth.value = {}
    inputError.value = {}
    router.push({ name: 'login' })
  }

  const editProfile = async () => {
    inputError.value = {}
    if (profile.email === '') inputError.value.email = 'El email es obligatorio'
    if (profile.name === '') inputError.value.name = 'El nombre es obligatorio'

    if (Object.values(inputError.value).length === 0) {
      try {
        await authApi.updateUser(profile)
        Object.assign(profile, {
          name: '',
          description: '',
          email: ''
        })
        toast.open({
          message: 'Perfil editado correctamente',
          type: 'success'
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const saveImage = async () => {
    inputError.value = {}
    if (typeof profile.image === 'string' || profile.image === null) inputError.value.image = 'La imagen es obligatoria'

    if (Object.values(inputError.value).length === 0) {
      const formData = new FormData()
      formData.append('image', profile.image)

      try {
        if (!imageNow.value) {
          const { data: image } = await authApi.uploadImage(formData)
          profile.image = image.fileName
        } else {
          const { data: image } = await authApi.updateImage(imageNow.value, formData)
          profile.image = image.fileName
        }
        await authApi.updateUser(profile)
        imageNow.value = ''
        toast.open({
          message: 'Imagen modificada correctamente',
          type: 'success'
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
        toast.open({
          message: 'Hubo un error',
          type: 'error'
        })
      }
    }
  }

  return {
    user,
    profile,
    userAuth,
    getUserAuth,
    getUser,
    userOne,
    loginUser, 
    logout,
    editProfile,
    saveImage,
    register,
    login,
    inputError,
    imageNow
  }
})