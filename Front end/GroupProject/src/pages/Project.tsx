import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../api/config.ts";
import NewTaskBox from "../components/Task/NewTaskBox.tsx";
import { currentUser } from "../stores/userStore.ts";
import type { ProjectDTO } from "../types/models.js";
import TaskComponent from "../components/TaskComponent.tsx";
import TeamComponent from "../components/TeamComponent.tsx";
import { useParams } from "react-router";
import NewTeamButton from "../components/NewTeamButton.tsx";

const Project = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const numericProjectId = Number(projectId);

    const userLogin = currentUser();

    const {
        data: project,
        isLoading,
        error,
        refetch
    } = useQuery<ProjectDTO>({
        queryKey: ["projects", numericProjectId],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/myProjects/id/${numericProjectId}?userId=${userLogin.id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }
            return response.json();
        },
    });

    if (isLoading) return <div>Loading project...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error.message}</div>;

    return (
        <div style={{ flex: 1, display: "flex" }}>

            <div style={{ margin: "16px" }}>
                <div
                    style={{
                        flex: 1,
                        height: "calc(100vh - 120px)",
                        width: "300px",
                        background: "black",
                        border: "2px solid white",
                        borderRadius: "10px",
                        marginTop: "8px",
                        overflowY: "scroll",
                        overflowX: "hidden"
                    }}
                >
                    <strong
                        style={{
                            display: "block",
                            fontSize: "30px",
                            textAlign: "center"
                        }}
                    >
                        Teams {numericProjectId}
                    </strong>


                    {project && project.teams.length > 0 ? (
                        project.teams.map((team) => (
                            <TeamComponent
                                key={team.id}
                                teamId={team.id}
                                teamName={team.name}
                            />
                        ))
                    ) : (
                        <p style={{ padding: "8px", textAlign: "center" }}>
                            No teams assigned
                        </p>
                    )}

                    <NewTeamButton projectId={project?.id} />
                </div>
            </div>

            <div style={{ margin: "16px" }}>
                <strong
                    style={{
                        display: "block",
                        fontSize: "30px",
                        textAlign: "center"
                    }}
                >
                    Backlog
                </strong>

                <div
                    style={{
                        flex: 1,
                        height: "calc(100vh - 165px)",
                        width: "300px",
                        background: "black",
                        border: "2px solid white",
                        borderRadius: "10px",
                        marginTop: "8px",
                        overflowY: "scroll",
                        overflowX: "hidden"
                    }}
                >
                    {project &&
                        project.tasks
                            .filter((task) => !task.done)
                            .map((task) => (
                                <TaskComponent
                                    key={task.id}
                                    taskName={task.name}
                                    taskId={task.id}
                                    projectId={project.id}
                                    done={task.done}
                                    isWatching={task.watchers.some(
                                        (w) => w.id === userLogin.id
                                    )}
                                    userRole={userLogin.role}
                                />
                            ))}

                    {userLogin.role != "CLIENT" && <NewTaskBox
                        projectId={project!.id}
                        refreshTasks={() => refetch()}
                    />}
                </div>
            </div>

            <div style={{ margin: "16px" }}>
                <strong
                    style={{
                        display: "block",
                        fontSize: "30px",
                        textAlign: "center"
                    }}
                >
                    Done
                </strong>

                <div
                    style={{
                        flex: 1,
                        height: "calc(100vh - 165px)",
                        width: "300px",
                        background: "black",
                        border: "2px solid white",
                        borderRadius: "10px",
                        marginTop: "8px",
                        overflowY: "scroll",
                        overflowX: "hidden"
                    }}
                >
                    {project &&
                        project.tasks
                            .filter((task) => task.done)
                            .map((task) => (
                                <TaskComponent
                                    key={task.id}
                                    taskName={task.name}
                                    taskId={task.id}
                                    projectId={project.id}
                                    done={task.done}
                                    isWatching={task.watchers.some(
                                        (w) => w.id === userLogin.id
                                    )}
                                    userRole={userLogin.role}
                                />
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Project;