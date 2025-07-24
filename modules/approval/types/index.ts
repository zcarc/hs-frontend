import type { Meta } from "~/modules/post/types";

// 각 결재 단계의 결재자 정보
interface ResponseApprover {
  id: number;
  name: string;
}

// 결재 상태 정보
interface ResponseStatus {
  code: string;
  name: string;
}

// 각 결재 단계 정보
interface ResponseApprovalStep {
  stepOrder: number;
  approver: ResponseApprover;
  status: ResponseStatus;
  comment: string | null;
}

// 문서 작성자 정보
interface ResponseDrafter {
  name: string;
}

// 최종적으로 API를 통해 받는 결재 문서 상세 정보 타입
export interface ResponseApprovalDocument {
  id: number;
  title: string;
  content: string | null;
  drafter: ResponseDrafter;
  status: ResponseStatus;
  approvalDocumentSteps: ResponseApprovalStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalDocument {
  id: number;
  title: string;
  drafter: {
    name: string;
  };
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  statusId: number;
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
