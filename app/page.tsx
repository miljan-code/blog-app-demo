export default function Home() {
  return (
    <>
      <section className="py-6 md:py-8 lg:py-12">
        <div className="px-8 mx-auto max-w-5xl">
          <h1 className="font-heading font-extrabold md:text-6xl lg:text-7xl tracking-tight mb-3">
            Modern blogging experience
          </h1>
          <p className="text-xl text-muted-foreground">
            A modern blog built using Next 13.4, leveraging server actions and
            Drizzle ORM.
          </p>
          <hr className="mt-6" />
        </div>
      </section>
      <section className="py-4">
        <div className="container text-center">Blog posts...</div>
      </section>
    </>
  );
}
