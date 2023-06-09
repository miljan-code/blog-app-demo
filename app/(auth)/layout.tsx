interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="px-8 mx-auto max-w-5xl flex items-center justify-center flex-col gap-6">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
