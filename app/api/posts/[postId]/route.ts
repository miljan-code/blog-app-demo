import { currentUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { post } from '@/db/schema';

interface Params {
  postId: string;
}

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
