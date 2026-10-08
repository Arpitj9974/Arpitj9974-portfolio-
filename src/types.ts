export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  cardSummary?: string;
  buildingLogic?: string;
  purpose?: string;
  problemSolved?: string;
  targetUser?: string;
  aiOrchestration?: string;
  valueBadges?: string[];
  longDescription?: string;
  year: string;
  category: "Data" | "Web Apps" | "Mobile" | "Internal Tools";
  stack: string[];
  role?: string;
  timeline?: string;
  client?: string;
  outcome?: string;
  problem?: string;
  solution?: string;
  impactStats?: { label: string; value: string }[];
  featured?: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  repoStatus?: "public" | "client-proprietary" | "internal-infra";
  tag?: string;
}

export interface CareerInput {
  name: string;
  currentRole: string;
  targetRole: string;
  skills: string;
  values: string;
}

export interface CareerAssessmentResult {
  title: string;
  overview: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  skillsGap: {
    skill: string;
    priority: "High" | "Medium" | "Low";
    actionableStep: string;
  }[];
  roadmap: {
    phase: string;
    duration: string;
    milestones: string[];
    focus: string;
  }[];
  actionPlan: string;
}

export interface DemonstratedSystem {
  name: string;
  id: string;
  type: string;
  mode?: "narrative" | "prd";
}

export interface CapabilityDomain {
  category: string;
  badge?: string;
  tagline?: string;
  summary?: string;
  items: string[];
  demonstratedIn?: DemonstratedSystem[];
}

export interface ToolkitTool {
  name: string;
  query: string;
}

export interface ToolkitCategory {
  category: string;
  tools: ToolkitTool[];
}
