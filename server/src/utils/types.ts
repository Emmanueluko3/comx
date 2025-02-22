export interface UserData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  picture: string;
  email_verified: boolean;
  last_login: Date | string;
}

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
}
