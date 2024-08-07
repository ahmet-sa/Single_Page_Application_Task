<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gray-100 shadow p-2">
      <div class="flex items-center" :class="leftDrawerOpen ? 'pl-50' : ''">
        <button @click="toggleLeftDrawer" aria-label="Menu" class="p-2 rounded hover:bg-gray-200">
          ☰
        </button>
      </div>
    </header>

    <aside :class="['fixed top-0 left-0 h-full w-200px bg-white shadow-md transition-transform', { 'transform -translate-x-full': !leftDrawerOpen }]">
      <div class="p-4 text-center text-lg font-bold text-#8B8C8D ">MENU</div>
      <hr class="my-2" />
      <ul class="list-none p-0 m-0">
        <li v-for="link in linksList" :key="link.title" class="p-2 hover:bg-gray-100 no-caps">
          <router-link :to="link.link" class="flex items-center text-black no-underline text-20px">
            <i class="material-icons mr-2 text-#606060 no-underline">{{ link.icon }}</i>
            <span class="text-#606060 no-underline">{{ link.title }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <main class="flex-1 p-4" :class="leftDrawerOpen ? 'pl-63' : 'pl-2'">
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const linksList = [
  {
    title: 'Gönderiler',
    icon: 'person',
    link: '/'
  },
  {
    title: 'Kullanıcılar',
    icon: 'list_alt',
    link: '/user'
  },
]

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      linksList,
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

<style scoped>
/* Scoped styles if necessary */
</style>
