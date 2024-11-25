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
  BOOKED = "BOOKED",
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



export type Box = {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  isHeadquarter: boolean;
  headquarterBoxId?: string | null;
  users: User[];
  classes: Class[];
};

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
  Box: Box;
  BoxId: string;
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
  movementId: string;
  workoutId?: string;
  date: string;
  sets?: number;
  reps?: number;
  weight?: number;
  weightUnit?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  movement: Movement; // Reference to Movement
  workout?: Workout; // Reference to Workout (optional)
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
  version: number;
  originalWorkoutId?: string;
  description?: string;
  duration: number;
  intensity?: WorkoutIntensity;
  createdAt: string;
  updatedAt: string;
  movements: WorkoutMovement[]; // Related movements
}

export enum WorkoutType {
  AMRAP = 'AMRAP',
  EMOM = 'EMOM',
  FOR_TIME = 'FOR_TIME',
  STRENGTH = 'STRENGTH',
  STRETCHING = 'STRETCHING',
  CARDIO = 'CARDIO',
}

export enum WorkoutIntensity {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}
export interface Movement {
  id: string;
  name: string;
  category: MovementType;
  createdAt: string;
  updatedAt: string;
}
export interface WorkoutMovement {
  id: string;
  workoutId: string;
  movementId: string;
  reps?: number;
  sets?: number;
  weight?: number;
  weightUnit?: string;
  createdAt: string;
  updatedAt: string;
  movement: Movement; // Reference to Movement
}


export enum MovementType {
  CARDIO = "CARDIO",
  STRENGTH = "STRENGTH",
  FLEXIBILITY = "FLEXIBILITY",
  GYMNASTICS = "GYMNASTICS",
  OLYMPIC_LIFTING = "OLYMPIC_LIFTING",
  ACCESSORY = "ACCESSORY",
  CORE = "CORE",
  BALANCE = "BALANCE",
  ENDURANCE = "ENDURANCE",
  POWER = "POWER",
  BODYWEIGHT = "BODYWEIGHT",
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
  type: "ClassEnrollment";
  total: number;
  data: ClassEnrollment[];
  meta: {
    timestamp: string;
  };
}
export interface ClassEnrollmentAttendanceResponse {
  success: boolean;
  type: "ClassEnrollment";
  total: number;
  data: ClassEnrollment;
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
