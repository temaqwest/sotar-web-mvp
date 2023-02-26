<script lang="ts" setup>
import AppIcon from '@/components/UI/AppIcon/AppIcon.vue'
import AppDialog from '@/components/UI/AppDialog/AppDialog.vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { RoutePaths } from '@/router/router.types'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import AppAvatar from '@/components/UI/AppAvatar/AppAvatar.vue'

interface props {}
interface emits {}

defineEmits<emits>()
defineProps<props>()

const authStore = useAuthStore()
const getUserName = computed(() => authStore.getUserName()[0])
</script>

<template>
  <div class="the-user-menu">
    <div class="the-user-menu__user inline-flex gap-3.5 items-center">
      <AppAvatar :size="45">
        <span class="font-bold text-white text-1xl">
          {{ getUserName }}
        </span>
      </AppAvatar>
      <span class="font-bold text-xl text-white">
        Здравствуйте, {{ authStore.getUserName() }}
      </span>
    </div>
  </div>
</template>

<style lang="postcss">
.the-user-menu {
  padding: 1rem;
  margin: 1.8rem;
  background-color: var(--s-grey);
}
</style>
