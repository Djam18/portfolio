<template>
  <section class="mx-auto max-w-xl px-4 py-24">
    <h2 class="mb-8 font-display text-3xl font-bold">Get in Touch</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="form.name" placeholder="Name" required
        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none" />
      <input v-model="form.email" type="email" placeholder="Email" required
        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none" />
      <textarea v-model="form.message" placeholder="Message" rows="5" required
        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none" />
      <button type="submit" class="w-full rounded-lg bg-accent py-3 font-medium text-white transition hover:opacity-90">
        Send Message
      </button>
    </form>
    <p v-if="status" class="mt-4 text-center text-sm" :class="status.ok ? 'text-green-400' : 'text-red-400'">
      {{ status.msg }}
    </p>
  </section>
</template>

<script setup>
const form = reactive({ name: '', email: '', message: '' })
const status = ref(null)
const submit = async () => {
  const { error } = await useFetch('/api/contact', { method: 'POST', body: form })
  status.value = error.value
    ? { ok: false, msg: 'Error. Try again later.' }
    : { ok: true, msg: 'Message sent successfully!' }
  if (!error.value) Object.assign(form, { name: '', email: '', message: '' })
}
</script>