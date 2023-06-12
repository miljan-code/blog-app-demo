import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import { db } from '@/db';
import { Editor } from '@/components/editor';
import { post, type Post } from '@/db/schema';

const getPost = async (postId: Post['id'], userId: Post['author']) => {
  return await db
    .select()
    .from(post)
    .where(and(eq(post.id, postId), eq(post.author, userId)));
};

interface EditorPageProps {
  params: { postId: string };
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }

  const [post] = await getPost(+params.postId, user.id);

  if (!post) {
    notFound();
  }

  return <Editor post={post} />;
};

export default EditorPage;
