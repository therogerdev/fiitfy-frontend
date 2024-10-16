export const appLink = {
  dashboard: { label: 'Dashboard', href: '/dashboard' },
  programs: { label: 'Programs', href: '/programs' },
  createPrograms: { label: 'Create Program', href: '/programs/new' },
  members: { label: 'Members', href: '/members' },
  classes: { label: 'Classes', href: '/classes' },
  forgotPassword: {
    label: 'Forgot Password?',
    href: '/recover-password',
  },
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
};
