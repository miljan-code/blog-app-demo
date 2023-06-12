import { z } from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  coverUrl: z.string().optional(),
  content: z.any().optional(),
  author: z.string(),
  createdAt: z.string(),
});
