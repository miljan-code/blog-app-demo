import { SignOutButton } from '@/components/sign-out-button';

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-bold">Do you want to leave us? :(</h3>
      <SignOutButton />
    </div>
  );
};

export default SettingsPage;
