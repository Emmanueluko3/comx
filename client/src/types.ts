export type User = {
  email: string;
  password: string;
  StaySignedIn: boolean;
};
// INDIVIDUAL
export interface UserData {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  picture: string;
  email_verified: boolean;
  last_login: Date | string;
  onboarding_data: OnboardingData;
}

export interface UserMetadata {
  role: number | string;
  org: string;
}

// ORGANISATION

export interface OrgData {
  org_id: string;
  org_email: string;
  org_name: string;
  date_of_incorporation: Date;
  type_of_business: string;
  onboarding_type: string;
  created_time: Date;
  last_updated: Date;
  _id: string;
  onboarding_data: OnboardingData;
}

export interface OnboardingData {
  activeStep: number;
  complete: boolean;
  consented: boolean;
  form: any[];
}
