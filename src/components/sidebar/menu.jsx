const Menu = [
  {
    path: '/dashboard/v1',
    icon: 'fa fa-th',
    title: 'Dashboard'
  },
  {
    path: '/dashboard/v1',
    icon: 'fa fa-edit',
    title: 'Learn this Topic',
    children: [
      { path: '/dashboard/v1', title: 'Learn Page' },
      { path: '/dashboard/v2', title: 'Theory Page' },
      { path: '/dashboard/v2', title: 'Assignment Page' }
    ]
  },
  {
    path: '/dashboard/v1',
    icon: 'fa fa-code-branch fa-rotate-90',
    title: 'Page Nav',
    children: [
      { path: '/dashboard/v1', title: 'Section 1' },
      { path: '/dashboard/v2', title: 'Section 2' }
    ]
  },
  {
    path: '/dashboard/v1',
    icon: 'fas fa-lg fa-fw m-r-10 fa-gem',
    title: 'PhotonEcademy Courses'
  },
  {
    path: '/dashboard/v1',
    icon: 'fas fa-lg fa-fw m-r-10 fa-rocket',
    title: 'Online Tests Portal'
  },
  {
    path: '/dashboard/v1',
    icon: 'fa fa-briefcase',
    title: 'My Orders'
  },
  {
    path: '/dashboard/v1',
    icon: 'far fa-lg fa-fw m-r-10 fa-user-circle',
    title: 'Update Profile'
  },
  {
    path: '/dashboard/v1',
    icon: 'fas fa-lg fa-fw m-r-10 fa-sign-out-alt',
    title: 'Sign Out'
  }
];

export default Menu;
