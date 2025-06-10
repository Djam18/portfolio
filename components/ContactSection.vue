<!--
  ContactSection.vue: Contact form and information component
  Purpose: Allows visitors to send messages and provides contact details
  Props: None
  Features: Responsive layout, form validation, and animated elements
-->
<template>
  <section id="contact" class="py-20 bg-neutral">
    <div class="container mx-auto px-4">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
        {{ t('contact.title') }}
      </h2>

      <p class="text-center text-dark/70 max-w-3xl mx-auto mb-12">
        {{ t('contact.subtitle') }}
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Contact Information Column -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-primary mb-6">{{ t('contact.infoTitle') }}</h3>

            <!-- Contact Details -->
            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h4 class="text-sm font-medium text-dark/60">{{ t('contact.email') }}</h4>
                  <p class="mt-1 text-primary">adamabdeldjamala@gmail.com</p>
                </div>
              </div>

              <!-- Phone (commenté) -->
              <!--
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h4 class="text-sm font-medium text-dark/60">{{ t('contact.phone') }}</h4>
                  <p class="mt-1 text-primary">+229 6 12 34 56 78</p>
                </div>
              </div>
              -->

              <!-- Location -->
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h4 class="text-sm font-medium text-dark/60">{{ t('contact.location') }}</h4>
                  <p class="mt-1 text-primary">Benin, Cotonou</p>
                </div>
              </div>
            </div>

            <!-- Social Media Links -->
            <div class="mt-8">
              <h4 class="text-sm font-medium text-dark/60 mb-3">{{ t('contact.social') }}</h4>
              <div class="flex space-x-4">
                <a href="https://www.linkedin.com/in/abdel-djamal-adam-b952381b2/" class="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a href="https://github.com/Djam18" class="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Column -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-primary mb-6">{{ t('contact.formTitle') }}</h3>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Input -->
              <div>
                <label for="name" class="block text-sm font-medium text-dark/70 mb-1">{{ t('contact.form.name') }} *</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :placeholder="t('contact.form.namePlaceholder')"
                  class="w-full px-4 py-2 border border-neutral rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-300 focus:border-red-500': errors.name }"
                  :disabled="isSubmitting"
                  required
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="block text-sm font-medium text-dark/70 mb-1">{{ t('contact.form.email') }} *</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :placeholder="t('contact.form.emailPlaceholder')"
                  class="w-full px-4 py-2 border border-neutral rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-300 focus:border-red-500': errors.email }"
                  :disabled="isSubmitting"
                  required
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
              </div>

              <!-- Subject Input -->
              <div>
                <label for="subject" class="block text-sm font-medium text-dark/70 mb-1">{{ t('contact.form.subject') }} *</label>
                <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  :placeholder="t('contact.form.subjectPlaceholder')"
                  class="w-full px-4 py-2 border border-neutral rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-300 focus:border-red-500': errors.subject }"
                  :disabled="isSubmitting"
                  required
                />
                <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
              </div>

              <!-- Message Input -->
              <div>
                <label for="message" class="block text-sm font-medium text-dark/70 mb-1">{{ t('contact.form.message') }} *</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  :placeholder="t('contact.form.messagePlaceholder')"
                  rows="5"
                  class="w-full px-4 py-2 border border-neutral rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors resize-none"
                  :class="{ 'border-red-500 focus:ring-red-300 focus:border-red-500': errors.message }"
                  :disabled="isSubmitting"
                  required
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
              </div>

              <!-- Form Status Messages -->
              <div v-if="formStatus.message" :class="`text-${formStatus.type} text-sm font-medium p-3 bg-${formStatus.type}/10 rounded-md border border-${formStatus.type}/20`">
                {{ formStatus.message }}
              </div>

              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium flex items-center justify-center w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="inline-block animate-spin mr-2">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  {{ isSubmitting ? t('contact.form.sending') : t('contact.form.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Form data
const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form validation and submission state
const errors = reactive({})
const isSubmitting = ref(false)
const formStatus = reactive({
  message: '',
  type: 'success' // 'success' or 'error'
})

// Email validation helper
const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Clear status message after delay
const clearStatus = () => {
  setTimeout(() => {
    formStatus.message = ''
  }, 5000)
}

// Form submission handler
const handleSubmit = async () => {
  // Reset errors and status
  Object.keys(errors).forEach(key => delete errors[key])
  formStatus.message = ''

  // Validate form
  let isValid = true

  if (!formData.name.trim()) {
    errors.name = t('contact.validation.nameRequired')
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = t('contact.validation.emailRequired')
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = t('contact.validation.emailInvalid')
    isValid = false
  }

  if (!formData.subject.trim()) {
    errors.subject = t('contact.validation.subjectRequired')
    isValid = false
  }

  if (!formData.message.trim()) {
    errors.message = t('contact.validation.messageRequired')
    isValid = false
  } else if (formData.message.length < 10) {
    errors.message = t('contact.validation.messageLength')
    isValid = false
  }

  if (!isValid) return

  // Submit form
  isSubmitting.value = true

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      }
    })

    // Success response
    formStatus.message = t('contact.form.successMessage')
    formStatus.type = 'success'

    // Reset form
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''

    clearStatus()

  } catch (error) {
    console.error('Form submission error:', error)

    // Error handling
    formStatus.message = error.data?.message || t('contact.form.errorMessage')
    formStatus.type = 'error'

    clearStatus()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.text-success {
  color: #10b981;
}

.text-error {
  color: #ef4444;
}

.bg-success\/10 {
  background-color: rgba(16, 185, 129, 0.1);
}

.bg-error\/10 {
  background-color: rgba(239, 68, 68, 0.1);
}

.border-success\/20 {
  border-color: rgba(16, 185, 129, 0.2);
}

.border-error\/20 {
  border-color: rgba(239, 68, 68, 0.2);
}
</style>