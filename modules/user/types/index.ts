export enum UserRole {
  USER = "user",
  APPROVAL = "approval",
  ADMIN = "admin",
}

export interface User {
  id: number;
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: UserRole;
}
