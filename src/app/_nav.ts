import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Home',
    icon: 'icon-home',
    url: '/home',
  },

  {
    divider: true,
  },
  {
    title: true,
    name: 'Paramètrage',
  },
  {
    name: 'Utilisateurs',
    url: '/users',
    icon: 'fa fa-users'
  },
  {
    name: 'Catégories endroits',
    url: '/categories',
    icon: 'icon-star'
  },
  {
    name: 'Endroits',
    url: '/endroits',
    icon: 'icon-location-pin'
  },
  {
    name: 'Restaurants',
    url: '/restaurants',
    icon: 'fa fa-cutlery'
  },
  {
    name: 'Hebergements',
    url: '/hebergements',
    icon: 'fa fa-hotel'
  },
  {
    name: 'Evénements',
    url: '/events',
    icon: 'fa fa-calendar-o'
  },
  {
    name: 'Infos endroit',
    url: '/infos',
    icon: 'fa fa-book'
  },
  {
    name: 'Loisirs endroit',
    url: '/loisirs',
    icon: 'fa fa-child'
  },
];
