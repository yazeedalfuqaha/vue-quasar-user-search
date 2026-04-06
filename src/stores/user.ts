import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'
import axios from 'axios'
import type { User } from 'src/types/users'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const errorMessage = ref('')

  const getUser = async (id: string) => {
    errorMessage.value = ''
    user.value = null

    if (!id.trim()) {
      errorMessage.value = 'Please enter a user ID'
      return
    }

    loading.value = true
    try {
      const res = await api.get<User>(`/users/${id}`)

      if (!res.data || !res.data.id) {
        errorMessage.value = 'Invalid user data received'
        return
      }

      user.value = res.data

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          errorMessage.value = 'User not found'
        } else {
          errorMessage.value = `API Error: ${error.response?.status || error.message}`
        }
      } else {
        errorMessage.value = 'Unexpected error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    errorMessage,
    getUser,
  }
})
