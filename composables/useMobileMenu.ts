export const useMobileMenu = () => {
  const isOpen = useState('mobileMenuOpen', () => false)
  return {
    isOpen,
    toggle: () => isOpen.value = !isOpen.value,
    close: () => isOpen.value = false,
    open: () => isOpen.value = true,
  }
}