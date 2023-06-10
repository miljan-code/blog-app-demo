import { Icons } from '@/components/icons';

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

export interface DashboardConfig {
  nav: DashboardNavItem[];
}
