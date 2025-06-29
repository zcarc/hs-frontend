import type { Meta } from "~/modules/post/types";

export interface ApprovalDocument {
  id: number;
  title: string;
  drafter: {
    name: string;
  };
  status: ApprovalDocumentStatusEnum;
  createdAt: string;
}

export interface GetApprovalDocumentData {
  approvalDocuments: ApprovalDocument[];
  meta: Meta;
}

export enum ApprovalDocumentStatusEnum {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  IN_PROGRESS = "in_progress",
  REJECTED = "rejected",
  COMPLETED = "completed",
}
