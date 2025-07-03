import type { Meta } from "~/modules/post/types";

export interface ApprovalDocument {
  id: number;
  title: string;
  drafter: {
    name: string;
  };
  status: "draft" | "submitted" | "in_progress" | "rejected" | "completed";
  createdAt: string;
}

export interface GetApprovalDocumentData {
  approvalDocuments: ApprovalDocument[];
  meta: Meta;
}

export interface ApprovalDocumentPayload {
  templateId: number | null;
  title: string;
  content: string;
  status: "draft" | "submitted" | "rejected" | "completed";
}
