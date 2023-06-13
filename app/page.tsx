import { BlogPostItem } from '@/components/blog-post-item';
import { asc } from 'drizzle-orm';
import { db } from '@/db';
import { post } from '@/db/schema';

const getAllPosts = async () => {
  return await db.select().from(post).orderBy(asc(post.createdAt));
};

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="py-6 md:py-8 lg:py-12">
        <div className="px-8 mx-auto max-w-5xl">
          <h1 className="font-heading font-extrabold md:text-6xl lg:text-7xl tracking-tight mb-3">
            Modern blogging experience
          </h1>
          <p className="text-xl text-muted-foreground">
            A modern blog built using Next 13.4, Vercel Postgres, UploadThing
            and Drizzle ORM.
          </p>
          <hr className="mt-6" />
        </div>
      </section>
      <section className="py-4 mb-12">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 gap-8">
          {posts?.map(post => (
            <BlogPostItem key={post.id} {...post} />
          ))}
        </div>
      </section>
    </>
  );
}
