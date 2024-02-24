import { groupApi } from "@/api/groupApi";
import { defineStore } from "pinia";
import { reactive, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export const useGroupStore = defineStore('group', () => {
  const toast = inject('toast')
  const router = useRouter()
  const newGroup = reactive({
    title: '',
    description: '',
    website: '',
    image: '',
    category: ''
  })
  const errorInput = ref({})

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

  return {
    newGroup,
    createGroup,
    errorInput
  }
})