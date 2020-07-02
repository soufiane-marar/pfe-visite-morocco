import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: '',
  },
  {
    name: 'Dashboard',
    icon: 'fa fa-desktop',
    url: '/home',
  },
  {
    title: true,
    name: 'Endroits',
  },
  {
    name: 'Hebergements',
    url: '/hebergements',
    icon: 'fa fa-hotel'
  },
  {
    name: 'Restaurants',
    url: '/restaurants',
    icon: 'fa fa-cutlery'
  },
  {
    name: 'Evénements',
    url: '/events',
    icon: 'fa fa-bell'
  },
  {
    name: 'Infos',
    url: '/infos',
    icon: 'fa fa-book'
  },
  {
    name: 'Loisirs',
    url: '/loisir',
    icon: 'fa fa-child'
  },
  {
    name: 'Cultures',
    url: '/cultures',
    icon: 'fa fa-bank'
  },
  {
    name: 'Shopping',
    url: '/shopping',
    icon: 'fa fa-shopping-cart'
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
    name: 'Catégories',
    url: '/categories',
    icon: 'fa fa-cubes'
  },
];
