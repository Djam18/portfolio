// composables/useGithub.ts
export const useGithub = () => {
  const appConfig = useAppConfig()

  const githubUrl = computed(() => appConfig.links?.github || 'https://github.com/Djam18')

  const username = computed(() => {
    const url = githubUrl.value
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1] || 'Djam18'
  })

  return {
    username,
    githubUrl,
  }
}
