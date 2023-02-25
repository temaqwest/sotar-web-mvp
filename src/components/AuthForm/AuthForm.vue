<script lang="ts" setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/UI/AppButton/AppButton.vue'
import AppInput from '@/components/UI/AppInput/AppInput.vue'
import AppDialog from '@/components/UI/AppDialog/AppDialog.vue'
interface AuthFormProps {
  token: string
  title: string
  subtitle: string
}
interface AuthFormEmits {
  (e: 'onCode', value: { code: string; valid: boolean }): void
  (e: 'onLogin', value: { login: string; valid: boolean }): void
}

const emit = defineEmits<AuthFormEmits>()

const props = withDefaults(defineProps<AuthFormProps>(), {
  token: '',
})

const login = ref('')
const code = ref('')
const registrationForm = ref(false)

const buttonText = computed(() =>
  props.token.length ? 'Войти' : 'Получить код'
)

function handleCodeRequest() {
  if (login.value.length < 5 || login.value.length > 32) {
    emit('onLogin', { login: login.value.replace(/@/, ''), valid: false })
    return false
  }

  emit('onLogin', { login: login.value.replace(/@/, ''), valid: true })
}

function handleLogin() {
  if (code.value.length !== 6) return

  emit('onCode', { code: code.value, valid: true })
}
</script>

<template>
  <div class="auth-form">
    <span class="font-mono text-5xl text-white text-center">{{ title }}</span>
    <span
      class="font-mono text-2xl text-white mb-3.5 text-center"
      v-if="subtitle.length"
    >
      {{ subtitle }}
    </span>
    <template v-if="!token">
      <AppInput
        v-model="login"
        placeholder="Ваш ник в Telegram "
        class="w-2/4 mt-5"
        border="rounded"
        size="normal"
        text="regular"
        minLength="5"
        maxLength="32"
      />
      <AppButton
        class="w-2/4"
        color="orange"
        border="rounded"
        size="large"
        text="bold"
        @click="handleCodeRequest"
      >
        {{ buttonText }}
      </AppButton>
    </template>
    <template v-else>
      <AppInput
        v-model="code"
        border="rounded"
        size="normal"
        text="regular"
        placeholder="Код"
        class="w-2/4 mt-5"
        maxLength="6"
      />
      <AppButton
        class="w-2/4"
        color="orange"
        border="rounded"
        size="large"
        text="bold"
        @click="handleLogin"
      >
        {{ buttonText }}
      </AppButton>
    </template>
    <button
      class="text-base font-medium text-slate-900 dark:text-slate-200"
      @click="registrationForm = !registrationForm"
    >
      Впервые здесь?
    </button>
    <AppDialog title="Зарегистрируйтесь в боте" v-model:show="registrationForm">
      <div class="mb-5 mx-5 grid grid-cols-1 divide-y-2">
        <p class="p-4 bg-orange-50">
          Если вы первый раз пользуетесь авторизацией в нашем сервисе, то вам
          необходимо
          <a
            href="https://t.me/sotar_test_bot"
            class="font-medium text-orange-600 dark:text-orange-500 hover:underline"
            >поздороваться</a
          >
          с нашим ботом
        </p>
        <p class="p-4 text-slate-400 bg-orange-50">
          Вы можете сделать это через
          <a
            href="https://t.me/sotar_test_bot"
            class="font-medium text-orange-600 hover:underline"
            >ссылку</a
          >
          или через QR-код.
          <img
            src="../../assets/images/qr_bot_simple.png"
            alt="QR-КОД"
            class="mt-3 m-auto"
          />
          Просто отправьте ему команду
          <span class="py-0.5 px-1.5 bg-orange-500 rounded font-bold text-white"
            >/start</span
          >
        </p>
        <p class="p-4 bg-orange-50">
          После этого вы можете снова вписать свой ник в поле авторизации и
          получить код
        </p>
      </div>
    </AppDialog>
  </div>
</template>

<style lang="postcss"></style>
