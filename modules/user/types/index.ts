import type { CommonCode } from "~/modules/common-code/types";

export interface User {
  id: number;
  userId: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userRole: CommonCode;
}
