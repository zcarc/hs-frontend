import { ApprovalDocumentStatusEnum } from "~/enum/approval.enum";
import type { ApprovalDocumentStatusKey } from "~/types/approval";

export function getStatusLabel(status: ApprovalDocumentStatusKey) {
  return ApprovalDocumentStatusEnum[status];
}
