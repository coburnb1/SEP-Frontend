export interface Respondent {
  userID?: string;
  firstName: string;
  lastName: string;
  email: string;
  availability: string[];
  attributes?: { [key: string]: string };
  groupID?: string;
  orgID?: string;
  isGroupLeader: boolean;
}
