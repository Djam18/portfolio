<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
      >
        <div class="pt-20 px-6">
          <button
            @click="close"
            class="absolute top-4 right-4 p-2 text-text-secondary"
          >
            <Icon name="ph:x" class="h-6 w-6" />
          </button>

          <nav class="flex flex-col gap-6">
            <NuxtLink
              v-for="item in nav"
              :key="item.to"
              :to="item.to"
              @click="close"
              class="text-2xl font-display font-bold text-text-primary"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const localePath = useLocalePath();
const isOpen = useState("mobileMenuOpen", () => false);

const close = () => {
  isOpen.value = false;
};

const { t } = useI18n();
const mobileMenuStore = useMobileMenu();
const { theme, toggle } = useColorTheme();

const nav = computed(() => [
  { to: localePath("/"), label: t("nav.home") },
  { to: localePath("/portfolio"), label: t("nav.projects") },
  { to: localePath("/skills"), label: t("nav.skills") },
  { to: localePath("/experience"), label: t("nav.experience") },
  { to: localePath("/blog"), label: t("nav.blog") },
  { to: localePath("/contact"), label: t("nav.contact") },
]);
</script>
