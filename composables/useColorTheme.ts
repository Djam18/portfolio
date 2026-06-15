// composables/useColorTheme.ts
export type Theme = 'dark' | 'light'

export function useColorTheme() {
  const themeCookie = useCookie<Theme>('color-theme', {
    default: () => 'dark',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 an
  })

  // Applique l'attribut data-theme sur <html>
  function applyTheme(theme: Theme) {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  function toggle() {
    const next: Theme = themeCookie.value === 'dark' ? 'light' : 'dark'
    themeCookie.value = next
    applyTheme(next)
  }

  return {
    theme: themeCookie,
    toggle,
    applyTheme,
  }
}