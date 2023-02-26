<script lang="ts" setup>
import AppIcon from '@/components/UI/AppIcon/AppIcon.vue'
import AppDialog from '@/components/UI/AppDialog/AppDialog.vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { RoutePaths } from '@/router/router.types'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

interface props {}
interface emits {}

defineEmits<emits>()
defineProps<props>()

const authStore = useAuthStore()
const isLogoutModalVisible = ref(false)

function handleLogout(flag = false) {
  if (flag) authStore.logout()
  else isLogoutModalVisible.value = true
}
interface SideBarMenuItem {
  title: string
  icon: string
  path: RoutePaths
}

const sidebarMenuItems: Array<SideBarMenuItem> = [
  {
    title: 'Главная',
    icon: 'main',
    path: RoutePaths.home,
  },
  {
    title: 'Мой профиль',
    icon: 'dashboard',
    path: RoutePaths.profile,
  },
  {
    title: 'Команды',
    icon: 'teams',
    path: RoutePaths.teams,
  },
  {
    title: 'События',
    icon: 'events',
    path: RoutePaths.events,
  },
  {
    title: 'Поиск',
    icon: 'search',
    path: RoutePaths.search,
  },
]
</script>

<template>
  <div class="the-sidebar">
    <img src="../../public/logo.png" class="the-sidebar__logo" />
    <div class="the-sidebar__list the-sidebar__list--top">
      <RouterLink
        v-for="item in sidebarMenuItems"
        :key="item.path"
        :to="{ name: item.path }"
        class="the-sidebar__item"
      >
        <AppIcon :name="item.icon" />
        {{ item.title }}
      </RouterLink>
    </div>
    <ul class="the-sidebar__list the-sidebar__list--bottom">
      <li class="the-sidebar__item">
        <AppIcon name="settings" />
        Настройки
      </li>
      <li class="the-sidebar__item">
        <AppIcon name="questions" />
        Руководство
      </li>
      <li class="the-sidebar__item">
        <AppIcon name="chat" />
        Связь с разработчиками
      </li>
      <li
        class="the-sidebar__item the-sidebar__item--logout"
        @click="handleLogout(false)"
      >
        <AppIcon name="logout" icon-color="var(--p-orange)" />
        Выйти
      </li>
    </ul>
    <AppDialog title="Вы хотите выйти?" v-model:show="isLogoutModalVisible">
      <div class="h-full p-4 w-full">
        <AppButton
          class="w-full mb-1 border-2"
          border="rounded"
          color="transparent"
          size="large"
          @click="isLogoutModalVisible = !isLogoutModalVisible"
        >
          Отмена
        </AppButton>
        <AppButton
          class="w-full"
          border="rounded"
          color="orange"
          size="large"
          @click="handleLogout(true)"
        >
          Да, выйти
        </AppButton>
      </div>
    </AppDialog>
  </div>
</template>

<style lang="postcss">
.the-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  max-width: var(--sidebar-len);
  background-color: var(--s-grey);
  width: 100%;
  display: grid;
  padding: 30px;
  grid-template-rows: min-content 1fr min-content;

  &__logo {
    max-width: 202px;
    margin: auto;
    pointer-events: none;
    user-select: none;
  }

  &__list {
    margin-top: 30px;

    &--top {
    }

    &--bottom {
    }
  }

  &__item {
    display: flex;
    gap: 8px;
    padding: 10px 15px;
    color: var(--color-white);
    font-size: 18px;
    border-radius: 8px;
    background-color: var(--t-grey);
    cursor: pointer;

    &:hover {
      background-color: var(--l-grey);
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
