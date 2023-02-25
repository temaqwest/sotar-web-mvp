<script lang="ts" setup>
import BackGround from '@/components/BackGround/BackGround.vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { RoutePaths } from '@/router/types'

const router = useRouter()
const authStore = useAuthStore()
function handleLogout() {
  console.log('logoit')
  authStore.logout()
  router.push({ name: RoutePaths.auth })
}
</script>

<template>
  <BackGround bg="--dp-gradient" type="full"> </BackGround>
  <AppButton
    border="rounded"
    size="normal"
    text="regular"
    color="orange"
    @click="handleLogout"
  >
    Выйти
  </AppButton>
</template>
