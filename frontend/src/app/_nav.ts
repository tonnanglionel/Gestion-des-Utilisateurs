import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'User Management',
    url: '/pages',
    icon: 'icon-user',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-logout'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-plus'
      },
      {
        name: 'Listing',
        url: '/listing',
        icon: 'icon-list'
      }
    ]
  },
  
  {
    name: 'Preferences',
    url: '#',
    class: 'mt-auto',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
