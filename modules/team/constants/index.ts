import { TeamCodeEnum } from "~/modules/team/enum";

export const TeamCodeLabel: Record<TeamCodeEnum, string> = {
  [TeamCodeEnum.DEVELOPMENT]: "개발팀",
  [TeamCodeEnum.MARKETING]: "마케팅팀",
  [TeamCodeEnum.HR]: "인사팀",
  [TeamCodeEnum.SALES]: "영업팀",
};
