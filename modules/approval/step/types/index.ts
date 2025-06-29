import type { User } from "~/modules/user/types";

export interface SaveApprovalSteps {
  approverId: number;
}

export interface ApprovalStep {
  id: number;
  status: string;
  stepOrder: number;
  approver: User;
  approverId: number;
  documentId?: number;
  approvedAt?: Date;
  comment?: string;
  templateId: number;
}
