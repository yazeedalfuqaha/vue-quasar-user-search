<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-pl-md q-pr-md">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="text-white" />
        <q-toolbar-title class="text-h6 text-weight-bold">My Company</q-toolbar-title>
        <div class="text-caption">v1.0</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer / Sidebar -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
      overlay-class="bg-black-1/50"
    >
      <q-list padding>
        <q-item-label header class="text-primary text-weight-bold">Main Navigation</q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="q-my-xs rounded hover-card"
        />
      </q-list>
    </q-drawer>

    <!-- Main content -->
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  { title: 'Home', caption: 'Main page', icon: 'home', link: '/' },
  { title: 'About Us', caption: 'Who we are', icon: 'info', link: '/about' },
  { title: 'Services', caption: 'What we offer', icon: 'build', link: '/services' },
  { title: 'Blog', caption: 'Latest news & articles', icon: 'article', link: '/blog' },
  { title: 'Contact', caption: 'Get in touch', icon: 'contact_mail', link: '/contact' },
  { title: 'FAQ', caption: 'Common questions', icon: 'help_outline', link: '/faq' },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
/* Hover effect on drawer items */
.hover-card {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  padding: 0.5rem;
}
.hover-card:hover {
  background-color: #e0f7fa; /* soft cyan */
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

/* Drawer overlay */
.q-drawer__overlay {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

/* Page container background */
.q-page-container {
  padding: 16px;
}

/* Header typography */
.q-header {
  font-family: 'Roboto', sans-serif;
}
</style>
