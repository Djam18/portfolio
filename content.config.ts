import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      source: "projects/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().optional(),
        status: z.enum(["live", "in-progress", "draft", "concept"]).default("draft"),
        stack: z.array(z.string()).optional(),
        image: z.string().optional(),
        wireframe: z.string().optional(),         // chemin vers le PNG wireframe
        link: z.string().optional(),
        github: z.string().optional(),
        featured: z.boolean().default(false),
        role: z.string().optional(),
        year: z.string().optional(),
        liveUrl: z.string().optional(),
        repoUrl: z.string().nullable().optional(),
        // Champs vision (projets non-live)
        vision: z.string().optional(),
        motivation: z.string().optional(),
        approach: z.string().optional(),
        expectedOutcome: z.string().optional(),
        // Champs case study (projets live uniquement)
        context: z.string().optional(),
        challenges: z.string().optional(),
        solution: z.string().optional(),
        results: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        author: z.string().optional(),
        readingTime: z.number().optional(),
        slug: z.string(),
      }),
    }),
  },
});