import type { UserRole } from "~/enum/user.enum";

export interface User {
  id: number;
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: UserRole;
}
