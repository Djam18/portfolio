import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().optional(),
        stack: z.array(z.string()).optional(),
        image: z.string().optional(),
        link: z.string().optional(),
        github: z.string().optional(),
        featured: z.boolean().default(false),
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
      })
    })
  }
})