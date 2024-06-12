import { faBarcode, faHome, faList, faUsers } from '@fortawesome/free-solid-svg-icons';

export const menuItems = [
  { title: 'Home', icon: faHome, to: '/' },
  {
    title: 'Admin',
    icon: faUsers,
    subMenu: [
      { title: 'User Management', to: '/admin/user-management', icon: faUsers },
      { title: 'Metrics', to: '/admin/metrics', icon: faUsers },
      { title: 'Health', to: '/admin/health', icon: faUsers },
    ],
  },
  {
    title: 'Entities',
    icon: faList,
    subMenu: [
      { title: 'Company', to: '/company', icon: faUsers },
      { title: 'Customer', to: '/customer', icon: faUsers },
    ],
  },
  {
    title: 'Barcode Test',
    icon: faList,
    subMenu: [{ title: 'Generating Barcode', to: '/GenerateBarcode', icon: faBarcode }],
  },
];
