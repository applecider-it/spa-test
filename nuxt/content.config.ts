import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: 'post/*.md',
      schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string()
      })
    })
  }
})
