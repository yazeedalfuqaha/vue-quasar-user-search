<template>
  <q-page class="q-pa-lg flex flex-center bg-grey-1">
    <q-card class="column shadow-2" style="width: 100%; max-width: 500px; border-radius: 12px">

      <!-- Header -->
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">User Search</div>
        <div class="text-subtitle2">Lookup profile details by ID</div>
      </q-card-section>

      <q-separator />

      <!-- Input -->
      <q-card-section class="q-gutter-md">
        <q-input
          v-model="userId"
          label="Enter User ID"
          outlined
          dense
          type="number"
          @keyup.enter="getUser"
          stack-label
        >
          <template v-slot:prepend>
            <q-icon name="person_search" />
          </template>
        </q-input>

        <q-btn
          label="Get User Data"
          color="primary"
          unelevated
          class="full-width"
          @click="getUser"
          icon="search"
        />
      </q-card-section>

      <!-- Error -->
      <q-banner v-if="errorMessage" dense class="bg-red-1 text-negative q-mx-md q-mb-md rounded-borders">
        <template v-slot:avatar>
          <q-icon name="error_outline" color="negative" />
        </template>
        {{ errorMessage }}
      </q-banner>

      <q-separator v-if="(user || loading) && !errorMessage" />

      <!-- Skeleton / Loading -->
      <q-card-section v-if="loading" class="q-pa-md animate-fade">
        <q-skeleton type="rect" height="56px" class="q-mb-md" />
        <q-skeleton type="text" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" />
        <q-skeleton type="rect" height="32px" class="q-mb-sm" />
        <q-skeleton type="rect" height="32px" class="q-mb-sm" />
        <q-skeleton type="rect" height="32px" class="q-mb-sm" />
      </q-card-section>


      //-------------------------

      <!-- User Info -->
      <q-card-section v-if="user && !loading" class="q-pa-md animate-fade">
        <div class="row items-center no-wrap q-mb-md">
          <q-avatar size="56px" font-size="32px" color="primary" text-white>
            {{ avatarLetter }}
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold">{{ user.name }}</div>
            <div class="text-caption text-grey-7">User ID: {{ user.id }}</div>
          </div>
        </div>

        <q-list dense>
          <!-- Email -->
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="email" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Email</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Address -->
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="place" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Address</q-item-label>
              <q-item-label>
                {{ user.address.street }}, {{ user.address.suite }}, {{ user.address.city }}, {{ user.address.zipcode }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- Phone -->
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="phone" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Phone</q-item-label>
              <q-item-label>{{ user.phone }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Website -->
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="language" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Website</q-item-label>
              <q-item-label>{{ user.website }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Company -->
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="business" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Company</q-item-label>
              <q-item-label>{{ user.company.name }} - "{{ user.company.catchPhrase }}"</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '../types/users'

const userId = ref<string>('')
const user = ref<User | null>(null)
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)

const getUser = async (): Promise<void> => {
  errorMessage.value = ''
  user.value = null

  if (!userId.value.trim()) {
    errorMessage.value = 'Please enter a user ID'
    return
  }

  loading.value = true
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
    if (!res.ok) {
      errorMessage.value = res.status === 404 ? 'User not found' : `API Error: ${res.status}`
      return
    }

    const data: User = await res.json()
    if (!data || !data.id) {
      errorMessage.value = 'Invalid user data received'
      return
    }

    user.value = data

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('API Error:', error)
      errorMessage.value = `Error: ${error.message}`
    } else {
      console.error('Unexpected error:', error)
      errorMessage.value = 'An unexpected API error occurred'
    }
  } finally {
    loading.value = false
  }
}

const avatarLetter = computed(() =>
  user.value ? user.value.name.charAt(0).toUpperCase() : ''
)
</script>

<style scoped>
.animate-fade {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
