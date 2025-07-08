import type { Meta } from "~/modules/post/types";

// 각 결재 단계의 결재자 정보
interface ResponseApprover {
  id: number;
  name: string;
}

// 결재선 템플릿에 포함된 팀 정보
interface ResponseTeam {
  commonCode: {
    id: number;
    name: string;
  };
}

// 결재선 템플릿 정보
interface ResponseStepTemplate {
  name: string;
  team: ResponseTeam;
}

// 각 결재 단계 정보
interface ResponseApprovalStep {
  stepOrder: number;
  approver: ResponseApprover;
  template: ResponseStepTemplate;
}

// 문서 작성자 정보
interface ResponseDrafter {
  name: string;
}

// 최종적으로 API를 통해 받는 결재 문서 상세 정보 타입
export interface ResponseApprovalDocument {
  // 기본 필드
  id: number;
  title: string;
  content: string | null;
  drafterId: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;

  // include를 통해 추가된 중첩 객체 필드
  drafter: ResponseDrafter;
  approvalSteps: ResponseApprovalStep[];
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
