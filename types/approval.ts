export type ApprovalStatus = "진행중" | "상신대기" | "반려" | "완료";

export interface ApprovalDocument {
  id: string;
  title: string;
  drafter: string;
  status: ApprovalStatus;
  createdAt: string;
  step: string; // ex: '1/3', '완료', '반려'
}
