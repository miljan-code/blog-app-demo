import { DashboardNav } from '@/components/dashboard-nav';
import { dashboardConfig } from '@/config/dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="px-8 mx-auto max-w-5xl grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden md:flex flex-col w-[200px]">
          <DashboardNav items={dashboardConfig.nav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
