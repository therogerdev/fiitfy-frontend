export const appLink = {
  dashboard: { label: 'Dashboard', href: '/' },
  programs: { label: 'Programs', href: '/programs' },
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
