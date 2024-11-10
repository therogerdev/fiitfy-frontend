// src/types/apiTypes.ts

export enum EndpointType {
  Program = 'program',
  CreateProgram = 'program/create',
  AllProgram = 'programs',
  Athlete = 'athlete',
  AllAthletes = 'athletes',
  Workout = 'workout',
  Coach = 'coach',
  Class = 'class',
  Membership = 'stripe/membership',
  Checkout = 'stripe/checkout',
  Enroll = 'enroll',
  Movement = 'movement',
  Box = 'box', // For gym/box entity
  Login = 'login',
  Logout = 'logout',
  Signup = 'signup',
  Me = 'me',
  // Add more endpoint types as needed
}
