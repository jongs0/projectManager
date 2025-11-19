import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../api/config.ts";
// import TaskComponent from "../components/Task/TaskComponent.tsx";
import { currentUser } from "../stores/userStore.ts";
import type { ProjectDTO, TaskDTO } from "../types/models.js";
import TaskComponent from "../components/TaskComponent.tsx";
import TeamComponent from "../components/TeamComponent.tsx";
import type Task from "./Task.tsx";
import { useParams } from "react-router";


const Project = () => {
    const { projectId: projectId } = useParams<{ projectId: string }>();

    const userLogin = currentUser();

    const {
        data: project,
        isLoading,
        error,
    } = useQuery<ProjectDTO>({
        queryKey: ["projects", projectId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/myProjects/${projectId}?userId=${userLogin.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch project");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading project...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error.message}</div>;
    }

    return (
        <div style={{ flex: 1, display: "flex", }}>
            <div style={{
                width: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                margin: "16px",
            }}>
                <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>Teams</strong>
                <div style={{
                    flex: 1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    marginTop: "8px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    <TeamComponent />
                    <TeamComponent />
                    <TeamComponent />
                </div>
            </div>




            <div style={{ marginLeft: "0px", margin: "16px" }}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Backlog</strong>
                <div style={{
                    flex: 1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    marginTop: "8px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    {project && project.tasks.length > 0 ? project.tasks.map((task) => (
                        <TaskComponent key={task.id} taskName={task.name} taskId={task.id} />
                    )) : (
                        <p>No tasks</p>
                    )}
                </div>
            </div>


            <div style={{ marginLeft: "0px", margin: "16px" }}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Done</strong>
                <div style={{
                    flex: 1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    marginTop: "8px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                    <TaskComponent />
                </div>
            </div>

        </div>

    )

}

export default Project;