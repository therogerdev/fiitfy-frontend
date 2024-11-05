export const appLink = {
  dashboard: { label: 'Dashboard', href: '/dashboard' },
  programs: { label: 'Programs', href: '/programs' },
  createPrograms: { label: 'Create Program', href: '/programs/new' },
  classes: { label: 'Classes', href: '/class' },
  createClass: { label: 'Create Class', href: '/class/create' },
  forgotPassword: {
    label: 'Forgot Password?',
    href: '/recover-password',
  },
  classDetail: (slug: string, name: string) => ({
    label: name,
    href: `/class/${slug}`,
  }),
  programDetail: (slug: string, name: string) => ({
    label: name,
    href: `/program/${slug}`,
  }),
  programEdit: (slug: string) => ({
    label: 'Edit Program',
    href: `/program/${slug}/edit`,
  }),
  deleteProgram: (slug: string) => ({
    label: 'Delete Program',
    href: `/program/${slug}/delete`,
  }),
  login: { label: 'Login', href: '/login' },

  // Athletes
  athletes: { label: 'Athletes', href: '/athletes' }, //athletes list for admin users
  athlete: (id: string) => ({
    label: 'Athlete Area',
    href: `/athlete/${id}`,
  }),
};
