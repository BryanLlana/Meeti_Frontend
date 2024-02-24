import { defineStore } from "pinia";
import { reactive } from 'vue'

export const useGroupStore = defineStore('group', () => {
  const newGroup = reactive({
    title: '',
    description: '',
    url: '',
    image: '',
    category: ''
  })

  const createGroup = e => {
    e.preventDefault()

    
  }

  return {
    newGroup,
    createGroup
  }
})