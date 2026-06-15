<!-- pages/portfolio/[slug].vue -->
<template>
  <article class="mx-auto max-w-3xl px-4 py-24">
    <NuxtLink
      :to="localePath('/portfolio')"
      class="mb-8 inline-block text-sm text-accent hover:underline"
    >
      ← {{ t("portfolio.backToList") }}
    </NuxtLink>

    <NuxtImg
      v-if="project?.image"
      :src="project.image"
      :alt="project?.title ?? ''"
      format="webp"
      loading="lazy"
      class="mb-8 w-full rounded-lg object-cover"
    />
    <h1 class="mb-4 font-display text-4xl font-bold">{{ project?.title }}</h1>
    <div
      class="mb-6 flex flex-wrap items-center gap-4 text-sm text-text-secondary"
    >
      <span class="text-accent">{{ project?.role }}</span>
      <span>{{ project?.year }}</span>
    </div>

    <div class="mb-8 flex flex-wrap gap-2">
      <BadgeTag v-for="tech in project?.stack" :key="tech" variant="accent">{{
        tech
      }}</BadgeTag>
    </div>

    <div class="prose prose-invert max-w-none">
      <h2>{{ t("portfolio.context") }}</h2>
      <p>{{ project?.context }}</p>

      <h2>{{ t("portfolio.challenges") }}</h2>
      <p>{{ project?.challenges }}</p>

      <h2>{{ t("portfolio.solution") }}</h2>
      <p>{{ project?.solution }}</p>

      <h2>{{ t("portfolio.results") }}</h2>
      <p>{{ project?.results }}</p>
    </div>

    <div class="mt-12 flex gap-4">
      <a
        v-if="project?.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener"
        class="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
      >
        {{ t("portfolio.liveSite") }} ↗
      </a>
      <a
        v-if="project?.repoUrl"
        :href="project.repoUrl"
        target="_blank"
        rel="noopener"
        class="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
      >
        {{ t("portfolio.sourceCode") }} ↗
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () =>
    queryCollection("projects")
      .where("stem", "=", `projects/${route.params.slug}`)
      .first(),
);
if (!project.value) {
  throw createError({ statusCode: 404, fatal: true });
}
</script>
