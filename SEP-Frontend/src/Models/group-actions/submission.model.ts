export interface Submission {
  name: string;
  email: string;
  availability: string[];
  attributes: { [key: string]: string };
}
