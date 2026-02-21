<script setup>
const { addNotification } = useNotification()
const { t } = useI18n()

const config = useRuntimeConfig();
const show = ref(false);
const username = ref("");
const password = ref("");
const remember = ref(false);
const error = ref("");

definePageMeta({
  layout: "auth",
});

const login = async () => {
  error.value = ''

  if (!username.value || !password.value) {
    addNotification({type: 'error', title: 'Ошибка', message: t('errors.required'), duration: 5000})
    return
  }

  try {
    const res = await $fetch(`${config.public.homeserverUrl}/_matrix/client/v3/login`, {
      method: "POST",
      body: {
        type: "m.login.password",
        identifier: { type: "m.id.user", user: username.value },
        password: password.value,
        device_id: "SRYTJPQBDR",
        initial_device_display_name: "Synapse Admin",
        refresh_token: true,
      }
    })

    const maxAge = remember.value ? 60 * 60 * 24 * 30 : 60 * 60 * 24

    const access = useCookie("access_token", { maxAge })
    const refresh = useCookie("refresh_token", { maxAge })
    const expires = useCookie("expires_at", { maxAge })

    access.value = res.access_token
    refresh.value = res.refresh_token
    expires.value = Date.now() + res.expires_in_ms

    await navigateTo("/")
  } catch (e) {
    const code = e?.data?.errcode

    if (code === 'M_FORBIDDEN' || code === 'M_UNKNOWN_TOKEN') {
      addNotification({type: 'error', title: 'Ошибка', message: t('errors.invalidCredentials'), duration: 5000})
      return
    }

    if (code === 'M_UNAUTHORIZED') {
      addNotification({type: 'error', title: 'Ошибка', message: t('errors.sessionExpired'), duration: 5000})
      return
    }

    if (!e?.data) {
      addNotification({type: 'error', title: 'Ошибка', message: t('errors.network'), duration: 5000})
      return
    }

    addNotification({type: 'error', title: 'Ошибка', message: t('errors.server'), duration: 5000})
  }
}
</script>

<template>
  <h1 class="sr-only">{{ $t("auth") }}</h1>
  <div class="flex items-center justify-center md:rounded-2xl h-screen md:h-full bg-primary">
    <div class="bg-white rounded-2xl w-sm md:w-md pt-12 px-6 pb-4">
      <form @submit.prevent="login" class="pb-6 flex flex-col items-center gap-8">
        <div class="text-center">
          <h2 class="font-semibold text-4xl mb-2">
            {{ config.public.serverName }}
          </h2>
          <p>{{ $t("adminChat") }}</p>
        </div>
        <div class="w-full flex flex-col gap-4 [&_p]:text-sm [&_p]:pb-1">
          <UFormField :label="$t('username')" required>
            <UInput v-model="username" id="username" icon="material-symbols:account-circle" size="xl" variant="soft"
              class="w-full bg-gray-100 rounded-2xl border-2 border-transparent focus-within:border-2 focus-within:border-primary overflow-hidden"
              required />
          </UFormField>
          <UFormField :label="$t('password')" required>
            <UInput icon="material-symbols:password" v-model="password" size="xl" :type="show ? 'text' : 'password'"
              :ui="{ trailing: 'pe-1' }" variant="soft"
              class="w-full bg-gray-100 rounded-2xl border-2 border-transparent focus-within:border-2 focus-within:border-primary overflow-hidden"
              required>
              <template #trailing>
                <UButton color="neutral" variant="link" size="xl" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                  @click="show = !show" />
              </template>
            </UInput>
          </UFormField>
          <UCheckbox v-model="remember" :label="$t('rememberMe')" />
        </div>
        <UButton type="submit" icon="i-lucide-rocket" size="md" class="rounded-xl tracking-widest font-semibold px-6">{{
          $t("login") }}</UButton>
      </form>
      <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" class="mb-4 w-full">
        {{ error }}
      </UAlert>
      <div class="flex justify-between text-gray-400">
        <UButton to="https://github.com/burr64/synapse-admin" icon="grommet-icons:github" target="_blank" variant="link"
          color="neutral" />
        <p class="text-sm font-semibold text-muted">0.0.1</p>
      </div>
    </div>
  </div>
</template>
