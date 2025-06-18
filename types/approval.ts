import { ApprovalDocumentStatusEnum } from "~/enum/approval.enum";

export interface ApprovalDocument {
  id: number;
  title: string;
  drafter: {
    name: string;
  };
  status: ApprovalDocumentStatusKey;
  createdAt: string;
}

export interface GetApprovalDocumentData {
  approvalDocuments: ApprovalDocument[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export type ApprovalDocumentStatusKey = keyof typeof ApprovalDocumentStatusEnum;
