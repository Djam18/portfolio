<!-- components/common/CookieBanner.vue -->
<template>
  <Transition name="banner">
    <div
      v-if="!accepted"
      class="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-xl border border-border bg-surface p-4 shadow-lg md:left-auto md:right-6 md:max-w-sm"
    >
      <p class="mb-3 text-sm text-text-secondary">
        {{ t('cookies.message') }}
        <NuxtLink :to="localePath('/privacy')" class="text-accent underline">
          {{ t('cookies.learnMore') }}
        </NuxtLink>
      </p>
      <div class="flex gap-2">
        <button
          @click="accept"
          class="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          {{ t('cookies.accept') }}
        </button>
        <button
          @click="decline"
          class="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-accent hover:text-accent"
        >
          {{ t('cookies.decline') }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const consent = useCookie<boolean | null>('cookie_consent', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
  path: '/',
  default: () => null,
})

const accepted = computed(() => consent.value === true)

function accept() {
  consent.value = true
}

function decline() {
  consent.value = false
}
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>