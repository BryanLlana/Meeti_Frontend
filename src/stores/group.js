import { groupApi } from "@/api/groupApi";
import { defineStore } from "pinia";
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export const useGroupStore = defineStore('group', () => {
  const toast = inject('toast')
  const router = useRouter()
  const errorInput = ref({})

  const newGroup = reactive({
    title: '',
    description: '',
    website: '',
    image: '',
    category: ''
  })

  const editGroup = reactive({
    id: '',
    title: '',
    description: '',
    website: '',
    image: '',
    category: ''
  })

  const imageNow = ref('')

  const groups = ref([])

  const getGroups = async () => {
    try {
      const { data } = await groupApi.findGroups()
      groups.value = data
    } catch (error) {
      console.log(error)
    }
  }

  const createGroup = async e => {
    errorInput.value = {}
    e.preventDefault()

    if (newGroup.title === '') errorInput.value.title = 'El título es obligatorio'
    if (newGroup.description === '') errorInput.value.description = 'La descripción es obligatoria'
    if (newGroup.image === '') errorInput.value.image = 'La imagen es obligatoria'
    if (newGroup.category === '') errorInput.value.category = 'La categoría es obligatoria'

    if (Object.values(errorInput.value).length === 0) {
      const formData = new FormData()
      formData.append('image', newGroup.image)

      try {
        const { data: image } = await groupApi.uploadImage(formData)
        newGroup.image = image.fileName
        await groupApi.createGroup(newGroup)
        newGroup.title = ''
        newGroup.description = ''
        newGroup.category = ''
        newGroup.image = ''
        newGroup.website = ''
        toast.open({
          message: 'Grupo creado correctamente',
          type: 'success'
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getGroup = async (id) => {
    errorInput.value = {}
    try {
      const { data } = await groupApi.findGroup(id)
      const { category, ...values } = data
      Object.assign(editGroup, {
        ...values,
        category: category.id
      })
    } catch (error) {
      toast.open({
        message: error.response.data.message,
        type: 'error'
      })
      router.push({ name: 'admin' })
      console.log(error)
    }
  }

  const updateGroup = async () => {
    errorInput.value = {}

    if (editGroup.title === '') errorInput.value.title = 'El título es obligatorio'
    if (editGroup.description === '') errorInput.value.description = 'La descripción es obligatoria'
    if (editGroup.category === '') errorInput.value.category = 'La categoría es obligatoria'

    if (Object.values(errorInput.value).length === 0) {
      try {
        const { id, ...values } = editGroup
        await groupApi.updateGroup(id, values)
        editGroup.id = ''
        editGroup.title = ''
        editGroup.description = ''
        editGroup.category = ''
        editGroup.website = ''
        toast.open({
          message: 'Grupo editado correctamente',
          type: 'success'
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateImage = async () => {
    errorInput.value = {}
    if (typeof editGroup.image === 'string') errorInput.value.image = 'La imagen es obligatoria'

    if (Object.values(errorInput.value).length === 0) {
      const formData = new FormData()
      formData.append('image', editGroup.image)

      try {
        const { data: image } = await groupApi.updateImage(imageNow.value, formData)
        editGroup.image = image.fileName
        const { id, ...values } = editGroup
        await groupApi.updateGroup(editGroup.id, values)
        editGroup.title = ''
        editGroup.description = ''
        editGroup.category = ''
        editGroup.image = ''
        editGroup.website = ''
        editGroup.id = ''
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

  const deleteGroup = async () => {
    try {
      await groupApi.deleteGroup(editGroup.id)
      editGroup.title = ''
      editGroup.description = ''
      editGroup.category = ''
      editGroup.image = ''
      editGroup.website = ''
      editGroup.id = ''
      toast.open({
        message: 'Grupo eliminado correctamente',
        type: 'success'
      })
      router.push({ name: 'admin' })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    newGroup,
    groups,
    editGroup,
    createGroup,
    getGroup,
    getGroups,
    updateGroup,
    updateImage,
    deleteGroup,
    errorInput,
    imageNow
  }
})