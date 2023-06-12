import { currentUser } from '@clerk/nextjs';
import { z, ZodError } from 'zod';
import { db } from '@/db';
import { post } from '@/db/schema';

const postDataSchema = z.object({ title: z.string() });
type PostData = z.infer<typeof postDataSchema>;

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response('Unauthorized', { status: 403 });
    }

    const postData = (await req.json()) as PostData;

    postDataSchema.parse(postData);

    const postResponse = await db
      .insert(post)
      .values({ title: postData.title, author: user.id })
      .returning();

    return new Response(JSON.stringify(postResponse), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
