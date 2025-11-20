/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-11-18 10:45:43.

export interface GroupProject1Application {
}

export interface CommentController {
}

export interface ProjectController {
    allProjects: ResponseEntity<ProjectDTO[]>;
}

export interface TaskController {
}

export interface TeamController {
}

export interface UserController {
}

export interface AppUser {
    id: number;
    email: string;
    password: string;
    role: Role;
    teams: Team[];
    watchedTasks: Task[];
    comments: Comment[];
}

export interface Comment {
    id: number;
    body: string;
    user: AppUser;
    task: Task;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
    teams: Team[];
}

export interface Task {
    id: number;
    name: string;
    description: string;
    done: boolean;
    watchingUsers: AppUser[];
    comments: Comment[];
    project: Project;
}

export interface Team {
    id: number;
    name: string;
    teamMembers: AppUser[];
    project: Project;
}

export interface AppUserRepository extends JpaRepository<AppUser, number> {
}

export interface CommentRepository extends JpaRepository<Comment, number> {
}

export interface ProjectRepository extends JpaRepository<Project, number> {
}

export interface TaskRepository extends JpaRepository<Task, number> {
}

export interface TeamRepository extends JpaRepository<Team, number> {
}

export interface AppUserService {
}

export interface CommentService {
}

export interface ProjectService {
}

export interface TaskService {
}

export interface TeamService {
}

export interface ResponseEntity<T> extends HttpEntity<T> {
    /**
     * @deprecated since 6.0
     */
    statusCodeValue: number;
    statusCode: HttpStatusCode;
}

export interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    tasks: TaskSummaryDTO[];
    teams: TeamSummaryDTO[];
}

export interface HttpStatusCode extends Serializable {
    error: boolean;
    "1xxInformational": boolean;
    "2xxSuccessful": boolean;
    "3xxRedirection": boolean;
    "4xxClientError": boolean;
    "5xxServerError": boolean;
}

export interface TaskSummaryDTO {
    id: number;
    name: string;
    body: string;
    watchers: AppUserSummaryDTO[];
    done: boolean;
}

export interface TeamSummaryDTO {
    id: number;
    name: string;
}

export interface JpaRepository<T, ID> extends ListCrudRepository<T, ID>, ListPagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
}

export interface Serializable {
}

export interface HttpEntity<T> {
    headers: { [index: string]: string[] };
    body: T;
}

export interface AppUserSummaryDTO {
    id: number;
    email: string;
    role: Role;
}

export interface ListCrudRepository<T, ID> extends CrudRepository<T, ID> {
}

export interface ListPagingAndSortingRepository<T, ID> extends PagingAndSortingRepository<T, ID> {
}

export interface QueryByExampleExecutor<T> {
}

export interface CrudRepository<T, ID> extends Repository<T, ID> {
}

export interface PagingAndSortingRepository<T, ID> extends Repository<T, ID> {
}

export interface Repository<T, ID> {
}

export type Role = "CLIENT" | "DEVELOPER" | "PROJECTMANAGER";
