export interface Respondent {
  _id: string;
  name: string;
  email: string;
  group_number: number;
  is_group_leader: boolean;
  organizationID: string;
  availability: {
    day: string;
    start: string;
    end: string;
    _id: string;
  }[];
  attribute_responses: any[]; // optional: you could type this better later
}
