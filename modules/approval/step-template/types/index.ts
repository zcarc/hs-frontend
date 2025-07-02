import type {
  ApprovalStep,
  SaveApprovalSteps,
} from "~/modules/approval/step/types";
import type { Meta } from "~/modules/post/types";
import type { Team } from "~/modules/team/types";
import type { User } from "~/modules/user/types";

export interface ApprovalStepTemplate {
  id: number;
  name: string;
  creatorId: number;
  teamId: number;
  createdAt: Date;
  creator: {
    name: string;
  };
  team?: Team;
  approvalSteps?: ApprovalStep[];
}

export interface SaveApprovalTemplatePayload {
  templateData: {
    name: string;
  };
  stepData: SaveApprovalSteps[];
  teamId: number;
}

export interface SaveApprovalTemplateInitialData {
  teamId: number | null;
  templateName: string;
  steps: SaveApprovalSteps[];
}

export interface DetailApprovalTemplateInitialData {
  templateName: string;
  teamId: number;
  teamName: string;
  users: User[];
}

export interface EditSaveApprovalTemplatePayload {
  templateId: number;
  templateData: {
    name: string;
  };
  stepData: SaveApprovalSteps[];
  teamId: number;
}

export interface ListApprovalTemplate {
  templates: ApprovalStepTemplate[];
  meta: Meta;
}
