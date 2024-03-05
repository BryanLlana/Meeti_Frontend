import { meetiApi } from "@/api/meetiApi";
import { defineStore } from "pinia";
import { reactive, ref, inject } from 'vue'
import { useRouter } from "vue-router";

export const useMeetiStore = defineStore('meeti', () => {
  const router = useRouter()
  const errorInput = ref({})
  const toast = inject('toast')
  const newMeeti = reactive({
    title: '',
    speaker: '',
    quota: '',
    description: '',
    date: '',
    hour: '',
    address: '',
    lat: '',
    lon: '',
    group: '' 
  })

  const editMeeti = reactive({
    id: '',
    title: '',
    speaker: '',
    quota: '',
    description: '',
    date: '',
    hour: '',
    address: '',
    lat: '',
    lon: '',
    group: '' 
  })

  const meetisNext = ref([])
  const meetisPrevious = ref([])

  const createMeeti = async (lastname, lat, lon) => {
    errorInput.value = {}
    newMeeti.address = lastname
    newMeeti.lat = lat
    newMeeti.lon = lon
    if (!newMeeti.group) errorInput.value.group = 'El grupo es obligatorio'
    if (!newMeeti.title) errorInput.value.title = 'El título es obligatorio'
    if (!newMeeti.speaker) errorInput.value.speaker = 'El invitado es obligatorio'
    if (!newMeeti.date || !newMeeti.hour) errorInput.value.date = 'El día y la hora son obligatorios'
    if (!newMeeti.address) errorInput.value.address = 'La dirección es obligatoria'
    if (!newMeeti.description) errorInput.value.description = 'La descripción es obligatoria'

    if (Object.values(errorInput.value).length === 0) {
      try {
        newMeeti.quota = newMeeti.quota === '' ? 0 : parseInt(newMeeti.quota)
        await meetiApi.createMeeti(newMeeti)
        Object.assign(newMeeti, {
          title: '',
          speaker: '',
          quota: '',
          description: '',
          date: '',
          hour: '',
          address: '',
          lat: '',
          lon: '',
          group: '' 
        })
        toast.open({
          message: 'Meeti creado correctamente',
          type: 'success'
        })
        router.push({ name: 'admin' })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const updateMeeti = async (lastname, lat, lon) => {
    console.log(lastname)
  }

  const getMeeti = async id => {
    errorInput.value = {}
    try {
      const { data } = await meetiApi.getMeeti(id)
      let { group, user, users, quota, ...values } = data
      quota = quota === 0 ? '' : quota
      Object.assign(editMeeti, {
        ...values,
        quota,
        group: group.id
      })
    } catch (error) {
      console.log(error)
      toast.open({
        message: error.response.data.message,
        type: 'error'
      })
      router.push({ name: 'admin' })
    }
  }

  const getMeetis = async () => {
    try {
      const { data } = await meetiApi.getMeetis()
      meetisNext.value = data.meetisNext
      meetisPrevious.value = data.meetisPrevious
    } catch (error) {
      console.log(error)
    }
  }

  return {
    newMeeti,
    editMeeti,
    meetisNext,
    meetisPrevious,
    createMeeti,
    updateMeeti,
    getMeeti,
    getMeetis,
    errorInput
  }
})