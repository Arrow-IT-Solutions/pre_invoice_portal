import { animate, style, transition, trigger } from '@angular/animations';

export interface NavbarData {
  routeLink?: string | '';
  icon?: string;
  label?: string;
  labelar?: string;
  expanded?: boolean;
  id?: string;
  idhash?: string;
  char?: string;
  items?: NavbarData[];
}

export const navbarData: NavbarData[] = [
  {
    label: 'Invoices',
    labelar: 'الفواتير',
    id: 'Invoices',
    icon: 'receipt',
    routeLink: 'invoices'
  },
  {
    label: 'Products',
    labelar: 'الأصناف',
    id: 'Products',
    icon: 'category',
    routeLink: 'products'
  },
  {
    label: 'Users',
    labelar: 'المستخدمين',
    id: 'Users',
    icon: 'group',
    items: [
      {
        label: 'Clients',
        labelar: 'الزبائن',
        id: 'Clients',
        routeLink: "clients"
      },
      {
        label: 'Employees',
        labelar: 'الموظفين',
        id: 'Employees',

        routeLink: "employees"
      }

    ]
  },
  {
    label: 'Settings',
    labelar: 'الإعدادات',
    id: 'Settings',
    icon: 'settings',
    routeLink: 'settings'
  }


 

  



];
