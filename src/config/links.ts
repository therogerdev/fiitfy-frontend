export const appLink = {
  dashboard: { label: "Dashboard", href: "/dashboard" },
  programs: { label: "Programs", href: "/programs" },
  workout: { label: "Workout", href: "/workout" },
  createWorkout: { label: "Create Workout", href: "/workout/create" },
  workoutBuilder: { label: "Workout Builder", href: "/workout-builder" },
  createPrograms: { label: "Create Program", href: "/programs/new" },
  classes: (label?: string) => ({
    label: label || "Schedule",
    href: "/class",
  }),
  createClass: { label: "Create Class", href: "/class/create" },
  forgotPassword: {
    label: "Forgot Password?",
    href: "/recover-password",
  },
  classDetail: (id: string, name: string) => ({
    label: name,
    href: `/class/${id}`,
  }),
  programDetail: (slug: string, name: string) => ({
    label: name,
    href: `/program/${slug}`,
  }),
  programEdit: (slug: string) => ({
    label: "Edit Program",
    href: `/program/${slug}/edit`,
  }),
  deleteProgram: (slug: string) => ({
    label: "Delete Program",
    href: `/program/${slug}/delete`,
  }),
  login: { label: "Login", href: "/login" },

  // Athletes
  // athletes: { label: 'Athletes', href: '/athlete' }, //athletes list for admin users
  athletes: (label?: string) => ({
    label: label || "Athletes",
    href: "/athlete",
  }),
  athleteDetail: (id: string) => ({
    label: "Athlete Detail",
    href: `/athlete/${id}`,
  }),
};
