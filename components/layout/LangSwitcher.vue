<!-- components/layout/LangSwitcher.vue -->
<template>
  <div class="relative">
    <select
      :value="locale"
      @change="switchLang(($event.target as HTMLSelectElement).value)"
      class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary focus:border-accent focus:outline-none"
    >
      <option v-for="l in locales" :key="l.code" :value="l.code">
        {{ l.name }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const localeCookie = useCookie<string>('i18n_redirected')

onMounted(() => {
  const saved = localeCookie.value
  if (saved && saved !== locale.value) {
    navigateTo(switchLocalePath(saved))
  }
})

function switchLang(newLocale: string) {
  localeCookie.value = newLocale
  navigateTo(switchLocalePath(newLocale))
}
</script>