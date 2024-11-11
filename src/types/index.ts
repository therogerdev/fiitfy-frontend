export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  COACH = "COACH",
}

export enum ClassType {
  CROSSFIT = "CROSSFIT",
  YOGA = "YOGA",
  HIIT = "HIIT",
  WEIGHTLIFTING = "WEIGHTLIFTING",
  MUAYTHAI = "MUAYTHAI",
}

export enum AttendanceStatus {
  ATTENDED = "ATTENDED",
  MISSED = "MISSED",
}

export enum ClassEnrollmentStatus {
  ENROLLED = "ENROLLED",
  CANCELED = "CANCELED",
  WAITLISTED = "WAITLISTED",
}

export enum RecurrenceType {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  CUSTOM = "CUSTOM",
}

export enum WorkoutType {
  ForTime = "ForTime",
  AMRAP = "AMRAP",
  EMOM = "EMOM",
  RFT = "RFT",
  Tabata = "Tabata",
  Chipper = "Chipper",
  Ladder = "Ladder",
  Strength = "Strength",
  Skill = "Skill",
}

export interface Box {
  id: string;
  name: string;
  nickname?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  website?: string;
  phone?: string;
  headquarter: boolean;
  headquarterBoxId?: string;
  branches: Box[];
  headquarterBox?: Box;
  Program: Programs[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  isActive: boolean;
  role: Role;
  athlete?: Athlete;
  athleteId?: string;
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Athlete {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  gender: string;
  profileImageUrl?: string;
  height?: number;
  weight?: number;
  isCoach: boolean;
  stripeCustomerId?: string;
  memberships: Membership[];
  performance: Performance[];
  enrollments: ClassEnrollment[];
  coachedClasses: Class[];
  createdAt: Date;
  updatedAt: Date;
  User?: User;
}
// Membership Type for Frontend
export interface Membership {
  id: string;
  type: MembershipType;
  priceId?: string; // Stripe Price ID for subscription plans
  stripeSubscriptionId?: string; // Stripe Subscription ID
  name?: string; // Stripe Product name
  startDate: Date;
  endDate: Date;
  athleteId: string;
  createdAt: Date;
  updatedAt: Date;
  athlete: Athlete; // Reference to the Athlete type
  isExpired: boolean;
}

// Enum for Membership Types
export enum MembershipType {
  DAY = "DAY",
  MONTH = "MONTH",
  UNIT_PACKAGE = "UNIT_PACKAGE",
  TRIMESTER = "TRIMESTER",
  SEMESTER = "SEMESTER",
  SUBSCRIPTION = "SUBSCRIPTION",
}

// Membership Response Type
export interface MembershipResponse {
  success: boolean;
  type: "membership";
  data: Membership;
  meta: {
    timestamp: string;
  };
}

export interface Components {
  id: string;
  name: string;
  description?: string;
  category: string;
  image?: string;
  video?: string;
  createdAt: Date;
  classesId?: string;
}

export interface Class {
  date: Date;
  id: string;
  name: string;
  description?: string;
  classType?: ClassType;
  capacity?: number;
  coachId?: string;
  coach?: Athlete;
  enrollments: ClassEnrollment[];
  activeEnrollments: number;
  isRecurring: boolean;
  recurrenceType?: RecurrenceType;
  recurrenceEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassEnrollment {
  id: string;
  athleteId: string;
  classId: string;
  checkInAt?: Date;
  isCheckedIn?: boolean;
  status?: ClassEnrollmentStatus;
  attendanceStatus?: AttendanceStatus;
  athlete: Athlete;
  class: Class;
  createdAt: Date;
  updatedAt: Date;
}

export interface Performance {
  id: string;
  athleteId: string;
  workout: string;
  result: string;
  date: Date;
  athlete: Athlete;
}

export interface Programs {
  id: string;
  slug: string;
  name?: string;
  description?: string;
  numWeeks?: number;
  numClassesPerWeek?: number;
  durationMin?: number;
  isDraft?: boolean;
  durationMax?: number;
  active?: boolean;
  published?: boolean;
  hasSchedule?: boolean;
  totalClasses?: number;
  classesId?: string;
  Box?: Box;
  boxId?: string;
  createdAt: Date;
}

export interface Workout {
  id: string;
  type?: WorkoutType;
  title: string;
  description?: string;
  createdAt: Date;
  duration: number;
  intensity?: string;
  movements: Movement[];
}

export interface Movement {
  id: string;
  createdAt: Date;
  name: string;
  weight?: string;
  reps: string[];
  category: string;
  workoutId?: string;
  Workout?: Workout;
}

export interface AthleteResponse {
  success: boolean;
  type: "athlete";
  total: number;
  data: Athlete[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
  meta: {
    timestamp: string;
  };
}

export interface ClassResponse {
  success: boolean;
  type: "class";
  total: number;
  data: Class[];
  meta: {
    timestamp: string;
  };
}

export interface ClassEnrollmentResponse {
  success: boolean;
  type: "classEnrollment";
  total: number;
  data: ClassEnrollment[];
  meta: {
    timestamp: string;
  };
}

export interface UserResponse {
  success: boolean;
  type: "user";
  total: number;
  data: Array<{
    attributes: User;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface BoxResponse {
  success: boolean;
  type: "box";
  total: number;
  data: Array<{
    attributes: Box;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface ComponentsResponse {
  success: boolean;
  type: "components";
  total: number;
  data: Array<{
    attributes: Components;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface PerformanceResponse {
  success: boolean;
  type: "performance";
  total: number;
  data: Array<{
    attributes: Performance;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface ProgramsResponse {
  success: boolean;
  type: "programs";
  total: number;
  data: Array<{
    attributes: Programs;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface WorkoutResponse {
  success: boolean;
  type: "workout";
  total: number;
  data: Array<{
    attributes: Workout;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface MovementResponse {
  success: boolean;
  type: "movement";
  total: number;
  data: Array<{
    attributes: Movement;
  }>;
  meta: {
    timestamp: string;
  };
}

export interface ClientError {
  error: string;
}
