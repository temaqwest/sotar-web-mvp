<script lang="ts" setup>
import BackGround from '@/components/BackGround/BackGround.vue'
import ViewContainer from '@/components/ViewContainer/ViewContainer.vue'
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import { ref } from 'vue'
import { AuthService } from '@/services/AuthService'

const login = ref('')
const password = ref('')

async function handleLogin() {
  console.log(login.value.length)
  if (!login.value.length) return

  const authService = new AuthService()

  const response = await authService.requestCode({
    telegramUsername: login.value.replace(/@/, ''),
  })

  console.log(response)
}
</script>

<template>
  <BackGround bg="--dp-gradient" type="full"></BackGround>
  <ViewContainer>
    <div class="auth-view">
      <div class="auth-view__header">
        <img class="auth-view__logo" src="../../public/logo.png" />
      </div>
      <div class="auth-view__row">
        <div class="auth-view__cell">
          <div class="font-mono text-5xl text-white mb-3.5">Авторизация</div>
          <AppInput
            v-model="login"
            placeholder="Ваш ник в Telegram "
            class="w-2/4 mt-5"
            border="rounded"
            size="normal"
            text="regular"
          />
          <AppInput
            v-model="password"
            border="rounded"
            size="normal"
            text="regular"
            placeholder="Код"
            class="w-2/4"
          />
          <AppButton
            class="w-2/4"
            color="orange"
            border="rounded"
            size="large"
            text="bold"
            @click="handleLogin"
          >
            Войти
          </AppButton>
        </div>
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
