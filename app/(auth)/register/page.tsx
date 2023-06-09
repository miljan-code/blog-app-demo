import { SignUp } from '@clerk/nextjs';

const RegisterPage = () => {
  return (
    <>
      <h2 className="text-5xl font-heading font-bold tracking-tight mb-4">
        Registration
      </h2>
      <SignUp />
    </>
  );
};

export default RegisterPage;
