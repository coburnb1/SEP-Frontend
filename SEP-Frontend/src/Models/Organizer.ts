class Organizer extends User {
  public password: string;
  public organizationID: string[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationID: string[],
  ) {
    super(firstName, lastName, email);
    this.organizationID = organizationID;
    this.password = password;
  }
}
