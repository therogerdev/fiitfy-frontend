export const appLink = {
  dashboard: { label: 'Dashboard', href: '/dashboard' },
  programs: { label: 'Programs', href: '/programs' },
  members: { label: 'Members', href: '/members' },
  classes: { label: 'Classes', href: '/classes' },
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
  addProgram: () => ({ label: 'Add Program', href: `/program/new` }),
};
