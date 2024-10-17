// Define the Role enum
export enum Role {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    COACH = 'COACH',
  }

  // Define the User type
  export interface User {
    id: string;
    username: string;
    password: string; // You might not want to expose the password on the frontend
    email: string;
    isActive: boolean;
    role: Role;
    athlete: Athlete;
  }
// Enum for gender options
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
  }


  // Type for User
  export interface User {
    id: string;          // Unique identifier for the user
    email: string;       // Unique email for authentication
    password: string;    // Password for authentication
    username: string;    // Username for the user
    isActive: boolean;   // Status of the user account
    role: Role;         // Role of the user (ADMIN, MEMBER, COACH)
  }

  // Type for Athlete
  export interface Athlete {
    id: string;                     // Unique identifier for the athlete
    userId?: string;                // Unique identifier referencing the User
    classesId?: string;             // Unique identifier for the class
    lastName: string;                // Athlete's last name
    email: string;                   // Unique email for the athlete
    gender: Gender;                  // Athlete's gender
    profileImageUrl?: string;        // URL to the athlete's profile image
    firstName: string;               // Athlete's first name
    height?: number;                 // Athlete's height in centimeters
    weight?: number;                 // Athlete's weight in kilograms
    memberships: Membership[];       // List of memberships associated with the athlete
    Performance: Performance[]; // List of performance data associated with the athlete
  }

  // Type for Classes
  export interface Classes {
    id: string;           // Unique identifier for the class
    name: string;        // Name of the class
    schedule: Date;      // Date and time of the class
    athletes: Athlete[];  // List of athletes associated with the class
  }

  // Type for Membership
  export interface Membership {
    id: string;           // Unique identifier for the membership
    type: string;        // Type of membership (e.g., monthly, yearly)
    startDate: Date;     // Start date of the membership
    endDate: Date;       // End date of the membership
    athleteId: string;   // Unique identifier referencing the Athlete
  }

  // Type for Performance
  export interface Performance {
    id: string;          // Unique identifier for the performance data entry
    athleteId: string;   // Unique identifier referencing the Athlete
    date: Date;          // Date of the performance data entry
    analysis: [];       // Analysis data (can be structured as needed, using JSON)
  }
