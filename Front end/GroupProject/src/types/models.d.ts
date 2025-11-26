/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-11-18 10:53:33.

export interface AppUserCreateDTO {
    email: string;
    password: string;
    role: Role;
}

export interface AppUserDTO {
    id: number;
    email: string;
    role: Role;
    teamDtos: TeamSummaryDTO[];
    taskDtos: TaskSummaryDTO[];
    commentDtos: CommentSummaryDTO[];
}

export interface AppUserLoginDTO {
    email: string;
    password: string;
}

export interface AppUserSummaryDTO {
    id: number;
    email: string;
    role: Role;
}

export interface AppUserUpdateDTO {
    email: string;
    password: string;
    role: Role;
}

export interface CommentCreateDTO {
    taskId: number;
    userId: number;
    body: string;
}

export interface CommentDTO {
    id: number;
    body: string;
    appUser: AppUserSummaryDTO;
    task: TaskSummaryDTO;
}

export interface CommentSummaryDTO {
    id: number;
    body: string;
    appUserDto: AppUserSummaryDTO;
}

export interface CommentUpdateDTO {
    body: string;
}

export interface ProjectCreateDTO {
    name: string;
    description: string;
}

export interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    tasks: TaskSummaryDTO[];
    teams: TeamSummaryDTO[];
}

export interface ProjectSummaryDTO {
    id: number;
    name: string;
    description: string;
}

export interface ProjectUpdateDTO {
    name: string;
    description: string;
}

export interface TaskCreateDTO {
    projectId: number;
    name: string;
    description: string;
}

export interface TaskDTO {
    id: number;
    name: string;
    body: string;
    comments: CommentSummaryDTO[];
    watchers: AppUserSummaryDTO[];
    done: boolean;
}

export interface TaskSummaryDTO {
    id: number;
    name: string;
    body: string;
    watchers: AppUserSummaryDTO[];
    done: boolean;
}

export interface TaskUpdateDTO {
    name: string;
    description: string;
}

export interface TeamCreateDTO {
    projectId: number;
    name: string;
}

export interface TeamDTO {
    id: number;
    name: string;
    project: ProjectSummaryDTO;
    teamMembers: AppUserSummaryDTO[];
}

export interface TeamSummaryDTO {
    id: number;
    name: string;
    projectId: number;
}

export interface TeamUpdateDTO {
    name: string;
}

export type Role = "CLIENT" | "DEVELOPER" | "PROJECTMANAGER";
