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
          @keyup.enter="fetchUser"
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
          :loading="store.loading"
          @click="fetchUser"
          icon="search"
        />
      </q-card-section>

      <!-- Error -->
      <q-banner
        v-if="store.errorMessage"
        dense
        class="bg-red-1 text-negative q-mx-md q-mb-md rounded-borders"
      >
        <template v-slot:avatar>
          <q-icon name="error_outline" color="negative" />
        </template>
        {{ store.errorMessage }}
      </q-banner>

      <q-separator v-if="(store.user || store.loading) && !store.errorMessage" />

      <!-- Loading -->
      <q-card-section v-if="store.loading" class="q-pa-md animate-fade">
        <q-skeleton type="rect" height="56px" class="q-mb-md" />
        <q-skeleton type="text" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" />
      </q-card-section>

      <!-- User Info -->
      <q-card-section v-if="store.user && !store.loading" class="q-pa-md animate-fade">
        <div class="row items-center no-wrap q-mb-md">
          <q-avatar size="56px" font-size="32px" color="primary" text-white>
            {{ avatarLetter }}
          </q-avatar>
          <div class="q-ml-md">
            <div class="text-h6 text-weight-bold">{{ store.user.name }}</div>
            <div class="text-caption text-grey-7">User ID: {{ store.user.id }}</div>
          </div>
        </div>

        <q-list dense>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="email" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Email</q-item-label>
              <q-item-label>{{ store.user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="place" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Address</q-item-label>
              <q-item-label>
                {{ store.user.address.street }},
                {{ store.user.address.city }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="phone" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Phone</q-item-label>
              <q-item-label>{{ store.user.phone }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from 'stores/user'

const userId = ref('')
const store = useUserStore()

const fetchUser = async () => {
  await store.getUser(userId.value)
}

const avatarLetter = computed(() =>
  store.user ? store.user.name.charAt(0).toUpperCase() : ''
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
