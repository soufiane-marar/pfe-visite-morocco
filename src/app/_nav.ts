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
    name: 'Paramètrage endroits',
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
    divider: true,
  },
  {
    title: true,
    name: 'Paramètrage general',
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
];
