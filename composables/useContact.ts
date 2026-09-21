// composables/useContact.ts
export const useContact = () => {
  const appConfig = useAppConfig()
  const copied = ref(false)

  const email = computed(() => appConfig.links?.email || '')

  const copyEmail = async () => {
    if (!email.value) return
    try {
      await navigator.clipboard.writeText(email.value)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Copy email failed:', err)
    }
  }

  return {
    email,
    copied,
    copyEmail,
    links: computed(() => appConfig.links || {}),
  }
}
