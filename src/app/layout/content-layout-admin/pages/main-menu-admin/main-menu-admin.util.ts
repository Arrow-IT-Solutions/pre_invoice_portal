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
    label: 'Dashboard',
    labelar: 'لوحة التحكم',
    id: 'dashboard',
    icon: 'speed',
    routeLink: 'dashBoard'
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
    label: 'Categories',
    labelar: ' الفئات',
    id: 'Categories',
    icon: 'category',
    routeLink: "categories"
  },

  {
    label: 'Advertisement',
    labelar: 'الإعلانات',
    id: 'Advertisement',
    icon: 'dvr',
    routeLink: "Advertisement"
  },

  {
    label: 'Category Event',
    labelar: ' حدث الفئة',
    id: 'Category-event',
    icon: 'event_note',
    routeLink: "category-event"
    // call_to_action
  },
  {
    label: 'Events',
    labelar: ' الأحداث',
    id: 'events',
    icon: 'event',
    routeLink: "events"
  },
  {
    label: 'Notifications',
    labelar: ' الإشعارات',
    id: 'notification',
    icon: 'notifications',
    routeLink: "notification"
  },
  {
    label: 'FeedBack',
    labelar: ' الآراء',
    id: 'feedback',
    icon: 'Comment',
    routeLink: "feedback"
  },
  {
    label: 'ٌRewards',
    labelar: ' المكافآت',
    id: 'reward',
    icon: 'star',
    routeLink: "rewards"
  },
  {
    label: 'ٌCategory Group',
    labelar: 'مجموعة الفئات',
    id: 'category-group',
    icon: 'border_all',
    routeLink: "category-group"
  },
  {
    label: 'ٌGroup Item',
    labelar: 'عنصر المجموعة',
    id: 'group-item',
    icon: 'line_weight',
    routeLink: "group-item"
  },
  {
    label: 'ٌEarned',
    labelar: 'المكاسب',
    id: 'earned',
    icon: 'control_point',
    routeLink: "earned"
  },
  {
    label: 'ٌTransfer',
    labelar: 'التحويلات',
    id: 'transfer',
    icon: 'swap_vert',
    routeLink: "transfer"
  },
  {
    label: 'ٌRedeem History',
    labelar: 'الاستردادات',
    id: 'redeem-history',
    icon: 'history',
    routeLink: "redeem-history"
  },
];
