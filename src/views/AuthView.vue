<script lang="ts" setup>
import BackGround from '@/components/BackGround/BackGround.vue'
import ViewContainer from '@/components/ViewContainer/ViewContainer.vue'
import AuthForm from '@/components/AuthForm/AuthForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RoutePaths } from '@/router/router.types'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const authStore = useAuthStore()

const formTitle = ref('Авторизация')
const formSubtitle = ref('')

const token = ref('')
function handleLogin({ login, valid }: { login: string; valid: boolean }) {
  if (valid) {
    authStore
      .requestCode({ telegramUsername: login })
      .then((response: any) => {
        token.value = response.token
        formTitle.value = `${login}, введите код`
        formSubtitle.value = ''
        console.log('Отправлен код', response)
      })
      .catch((error: AxiosError) => {
        formTitle.value = `Ошибка`
        formSubtitle.value = 'Возможно вам надо пообщаться с нашим ботом'
      })
  }
}
function handleCode({ code, valid }: { code: string; valid: boolean }) {
  if (valid) {
    authStore
      .login({ code, token: token.value })
      .then((response: any) => {
        console.log('Успешная авторизация', response)
        formTitle.value = `Успешно авторизован`
        router.push({ name: RoutePaths.home })
      })
      .catch((error: AxiosError) => {
        formTitle.value = `Неправильный код`
      })
  }
}
</script>

<template>
  <div class="content--inner">
    <BackGround bg="--dp-gradient" type="full"></BackGround>
    <ViewContainer>
      <div class="auth-view">
        <div class="auth-view__header">
          <img class="auth-view__logo" src="../../public/logo.png" />
        </div>
        <div class="auth-view__row">
          <AuthForm
            :title="formTitle"
            :subtitle="formSubtitle"
            :token="token"
            class="auth-view__cell"
            @on-login="handleLogin"
            @on-code="handleCode"
          />
          <div class="auth-view__cell">
            <img
              src="../assets/images/auth_picture.png"
              alt="sotar auth view"
              class="auth-view__image"
            />
          </div>
        </div>
      </div>
    </ViewContainer>
  </div>
</template>

<style lang="postcss">
.auth-view {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 60px 0;

  &__row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    flex: 1;
  }

  &__cell {
    flex: 1 1 50%;
    height: calc(100vh - 120px - 200px);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 40px;
    justify-content: center;
    gap: 25px;

    &:first-child {
      border-right: 3px solid white;
    }
  }

  &__image {
    pointer-events: none;
    user-select: none;
  }

  &__logo {
    max-width: 202px;
    width: 100%;
    height: auto;
    pointer-events: none;
    user-select: none;
  }

  &__header {
    display: inline-flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
