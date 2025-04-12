class User {
  public userID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public fullName: string;

  constructor(
    userID: string,
    firstName: string,
    lastName: string,
    email: string
  ) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.fullName = firstName + " " + lastName;
  }
}
