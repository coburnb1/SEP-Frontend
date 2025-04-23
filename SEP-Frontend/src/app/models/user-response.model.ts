export interface UserResponse {
  _id: string;
  email: string;
  password: string;
  name: string;
  attributes: Array<{name: string; options: string[]}>;
  organization_ids: Array<string>;
  __v: string;
}
