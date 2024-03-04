import { defineStore } from "pinia";
import { reactive, ref } from 'vue'

export const useMeetiStore = defineStore('meeti', () => {
  const errorInput = ref({})
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

  const createMeeti = (lastname, lat, lon) => {
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
      console.log('Creando meeti')
    }
  }

  return {
    newMeeti,
    createMeeti,
    errorInput
  }
})