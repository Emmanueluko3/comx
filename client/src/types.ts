export type User = {
  email: string;
  password: string;
  StaySignedIn: boolean;
};
export interface UserData {
  user_type: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  date_of_incorporation?: Date;
  type_of_business?: string;
  verified: boolean;
  last_login: Date | string;
  created_time: Date;
  last_updated: Date;
  _id: string;
}

export interface UserMetadata {
  role: number | string;
  org: string;
}
