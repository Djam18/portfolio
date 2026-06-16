<!-- pages/contact.vue -->
<template>
  <div class="mx-auto max-w-xl px-4 py-24 text-center">
    <h1 class="mb-8 font-display text-4xl font-bold">
      {{ t("contact.title") }}
    </h1>
    <p class="mb-8 text-text-secondary">{{ t("contact.description") }}</p>

    <div class="flex justify-center gap-6">
      <SocialLink
        v-for="social in SOCIALS"
        :key="social.name"
        :name="social.name"
        :icon="social.icon"
        :url="social.url"
      />
    </div>

    <div class="mt-8 flex flex-col items-center gap-4">
      <p class="text-sm text-text-secondary">
        {{ t("contact.emailMessage") }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          :href="`mailto:${email}`"
          class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          <Icon name="ph:envelope" class="h-4 w-4" />
          {{ t("contact.sendEmail") }}
        </a>
        <button
          @click="copyEmail"
          class="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <Icon :name="copied ? 'ph:check' : 'ph:copy'" class="h-4 w-4" />
          {{ copied ? t("contact.copied") : t("contact.copyEmail") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
import { SOCIALS } from '~/constants/socials'
const { links } = useAppConfig();
const email = links?.email
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Copy failed', err)
  }
}
useHead({
  title: computed(() => t('metaTitles.contactPage', { author: 'Adam Abdel-Djamal' }))
});
</script>
