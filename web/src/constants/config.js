import ResetPassword from '../features/resetPassword';
import PersonalInfo from '../features/personInfo';

export const title = "Successfactor Libray";

export const permissionMap = {
  'admin': [
    {
      label: 'User Management',
      key: '/admin/usermgt',
      icon: 'team',
      path: '/admin/usermgt',
      component: PersonalInfo
    },
    {
      label: 'Book Management',
      key: '/admin/bookmgt',
      icon: 'book',
      path: '/admin/bookmgt',
      component: PersonalInfo
    },
    {
      label: 'Personal Infomation',
      key: '/admin/personalmgt',
      icon: 'user',
      path: '/admin/personalmgt',
      component: PersonalInfo
    },
    {
      label: 'Reset Password',
      key: '/admin/resetpwd',
      icon: 'lock',
      path: '/admin/resetpwd',
      component: ResetPassword
    }
  ],
  'user': [
    {
      label: 'user',
      key: 'user',
      icon: 'user',
      path: 'm'
    },
    {
      label: 'Reset Password',
      key: 'password',
      icon: 'pass'
    }
  ]
};