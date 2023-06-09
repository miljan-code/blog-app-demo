import { SignUp } from '@clerk/nextjs';

const RegisterPage = () => {
  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="px-8 mx-auto max-w-5xl flex items-center justify-center flex-col gap-6">
        <h2 className="text-5xl font-heading font-bold tracking-tight mb-4">
          Registration
        </h2>
        <SignUp />
      </div>
    </section>
  );
};

export default RegisterPage;
