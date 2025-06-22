import { ApprovalDocumentStatusEnum } from "~/enum/approval.enum";

export const ApprovalDocumentStatusLabel: Record<
  ApprovalDocumentStatusEnum,
  string
> = {
  [ApprovalDocumentStatusEnum.DRAFT]: "임시저장",
  [ApprovalDocumentStatusEnum.SUBMITTED]: "상신대기",
  [ApprovalDocumentStatusEnum.IN_PROGRESS]: "진행중",
  [ApprovalDocumentStatusEnum.COMPLETED]: "완료",
  [ApprovalDocumentStatusEnum.REJECTED]: "반려",
};
