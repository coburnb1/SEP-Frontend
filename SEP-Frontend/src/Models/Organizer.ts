class Organizer extends User {
  public password: string;
  public organizationID: string[];

  constructor(
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationID: string[],
  ) {
    super(userID, firstName, lastName, email);
    this.organizationID = organizationID;
    this.password = password;
  }
}
