import { currentUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { post } from '@/db/schema';
import { z } from 'zod';

interface Params {
  postId: string;
}

const postPatchSchema = z.object({
  title: z.string(),
  content: z.any().optional(),
});

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response('Unauthorized', { status: 403 });
    }

    const postId = +params.postId;

    await db
      .delete(post)
      .where(and(eq(post.id, postId), eq(post.author, user.id)));

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response('Unauthorized', { status: 403 });
    }

    const postId = +params.postId;
    const json = await req.json();
    const body = postPatchSchema.parse(json);

    const updatedPost = await db
      .update(post)
      .set({ content: body.content, title: body.title })
      .where(and(eq(post.author, user.id), eq(post.id, postId)))
      .returning();

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
