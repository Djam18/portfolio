<!-- pages/skills.vue -->
<template>
  <div class="mx-auto max-w-5xl px-4 py-24">

    <!-- Header -->
    <div class="mb-16">
      <h1 class="mb-4 font-display text-4xl font-bold text-text-primary">
        {{ t('skills.title') }}
      </h1>
      <p class="max-w-2xl text-lg text-text-secondary">
        {{ t('skills.intro') }}
      </p>
    </div>

    <!-- Category grid -->
    <div class="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="[
          'rounded-card border border-border p-6 text-left transition',
          activeCategory === cat.id
            ? 'bg-surface border-accent'
            : 'hover:bg-surface/50'
        ]"
        @click="activeCategory = cat.id"
      >
        <div class="mb-2 flex items-center gap-3">
          <Icon :name="cat.icon" class="text-2xl text-accent" />
          <span class="font-display font-semibold text-text-primary">
            {{ t(`skills.categories.${cat.id}`) }}
          </span>
        </div>
        <LevelBadge :level="cat.level" />
        <p class="mt-2 text-sm text-text-secondary">
          {{ t(`skills.categoryDescriptions.${cat.id}`) }}
        </p>
      </button>
    </div>

    <!-- Active category detail -->
    <div
      v-if="skills[activeCategory]"
      class="rounded-card border border-border bg-surface/30 p-8"
    >
      <h2 class="mb-6 font-display text-2xl font-bold text-text-primary">
        {{ t(`skills.categories.${activeCategory}`) }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="tech in skills[activeCategory]"
          :key="tech.name"
          class="flex items-center justify-between border-b border-border/50 pb-4 last:border-0"
        >
          <div class="flex items-center gap-3">
            <Icon :name="tech.icon" class="text-xl text-text-primary" />
            <div>
              <span class="font-medium text-text-primary">{{ tech.name }}</span>
              <!-- localePath() assure le bon préfixe de langue sur chaque lien -->
              <NuxtLink
                v-if="getProjectLink(tech)"
                :to="localePath(getProjectLink(tech))"
                class="ml-2 text-sm text-accent hover:underline"
              >
                → {{ t('skills.seeProject') }}
              </NuxtLink>
            </div>
          </div>
          <LevelBadge :level="tech.level" size="sm" />
        </div>
      </div>
    </div>

    <!-- Current stack -->
    <div class="mt-16 rounded-card border border-border p-6">
      <h3 class="mb-4 font-display text-lg font-semibold text-text-primary">
        {{ t('skills.currentStack') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <BadgeTag v-for="tag in currentStack" :key="tag" variant="accent">
          {{ tag }}
        </BadgeTag>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()   // ← ajout pour les liens localisés
const appConfig = useAppConfig()
const skills = appConfig.skills

const categories = [
  { id: 'frontend', level: 'expert',     icon: 'ph:monitor'  },
  { id: 'backend',  level: 'expert',     icon: 'ph:server'   },
  { id: 'database', level: 'proficient', icon: 'ph:database' },
  { id: 'devops',   level: 'proficient', icon: 'ph:cloud'    },
  { id: 'ai',       level: 'proficient', icon: 'ph:robot'    },
] as const

const activeCategory = ref<'frontend' | 'backend' | 'database' | 'devops' | 'ai'>('frontend')

const currentStack = [
  'Nuxt 4.4', 'Laravel 11', 'TypeScript',
  'Tailwind', 'PostgreSQL', 'Docker',
  'GitHub Actions', 'Claude Code',
]

function getProjectLink(tech: { name: string; project?: string }): string {
  // Priorité 1 : champ project explicite dans app.config.ts
  if (tech.project) return `/portfolio/${tech.project}`

  // Priorité 2 : fallback par nom — AVEC /portfolio/ devant (c'était le bug)
  const map: Record<string, string> = {
    'Vue.js / Nuxt':        '/portfolio/adam-portfolio',  // ← /portfolio/ ajouté
    'Laravel / PHP':        '/portfolio/saas-ecommerce',
    'React / React Native': '/portfolio/mobile-x',        // ← /portfolio/ ajouté
    'Claude Code':          '/portfolio/adam-portfolio',
  }
  return map[tech.name] ?? null
}
</script>