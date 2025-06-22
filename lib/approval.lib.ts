import { ApprovalDocumentStatusEnum } from "~/enum/approval.enum";
import { ApprovalDocumentStatusLabel } from "~/constants/approval.constants";

export function getStatusLabel(status: ApprovalDocumentStatusEnum) {
  return ApprovalDocumentStatusLabel[status];
}
