import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <>
      <h2 className="text-5xl font-heading font-bold tracking-tight mb-4">
        Login
      </h2>
      <SignIn />
    </>
  );
};

export default LoginPage;
