import { categoryApi } from "@/api/categoryApi";
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const category = ref({})
  
  const getCategories = async () => {
    const { data } = await categoryApi.getCategories()
    categories.value = data
  }

  const getCategory = async id => {
    const { data } = await categoryApi.getCategory(id)
    category.value = data
  }

  return {
    categories, 
    getCategories,
    category,
    getCategory
  }
})