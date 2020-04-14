export const EmailAddress = "EmailAddress";
export type EmailAddress = typeof EmailAddress;

export const PhoneNumber = "PhoneNumber";
export type PhoneNumber = typeof PhoneNumber;

export const UserID = "UserID";
export type UserID = typeof UserID;

export type IPaypalRecipientType = EmailAddress|PhoneNumber|UserID;