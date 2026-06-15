<template>
  <div class="flex min-h-screen flex-col bg-background text-text-primary antialiased">
    <Header />
    <MobileMenu />

    <main class="flex-1 pt-16">
      <slot />
    </main>

    <Footer />
    <CookieBanner />
  </div>
</template>