class Respondent extends User {
  public availability: string[];
  public attributes: string[];
  public groupID: string;
  public orgID: string;
  public isGroupLeader: boolean;

  constructor(
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    availability: string[],
    attributes: string[],
    groupID: string,
    orgID: string,
    isGroupLeader: boolean
  ) {
    super(userID, firstName, lastName, email);
    this.availability = availability;
    this.attributes = attributes;
    this.groupID = groupID;
    this.orgID = orgID;
    this.isGroupLeader = isGroupLeader;
  }
}
