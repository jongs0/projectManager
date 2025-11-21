import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { ProjectDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { currentUser } from "../stores/userStore.ts";
import NewProjectButton from "../components/NewProjectButton.tsx";


const ProjectList = () => {
    const siteUser = currentUser();
    const queryClient = useQueryClient();

    const projectUrl = siteUser.role === "PROJECTMANAGER"
        ? `${API_URL}/myProjects/owned?userId=${siteUser.id}`
        : `${API_URL}/myProjects?userId=${siteUser.id}`;

    const deleteProject = useMutation({
        mutationFn: async (projectID: number) => {
            const res = await fetch(`${API_URL}/myProjects/${projectID}?userId=${siteUser.id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Deletion failed");
            return res.json();
        },
        onSuccess: (project) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
        onError: () => {
            console.log("No perms(?)");
        },
    });

    const navigate = useNavigate();

    const userLogin = currentUser();

    const {
        data: projects,
        isLoading,
        error,
    } = useQuery<ProjectDTO[]>({
        queryKey: ["projects", siteUser.id, siteUser.role],
        enabled: !!siteUser.id,
        queryFn: async () => {
            const response = await fetch(projectUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading projects...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2 style={{ padding: "16px" }}>My Projects</h2>



            <div style={{ padding: "16px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {projects && projects.length > 0 ? projects.map((project) => (
                    <div key={project.id}
                        style={{
                            height: "250px",
                            width: "400px",
                            display: "flex",
                            marginBottom: "16px",
                            border: "2px solid white",
                            borderRadius: "10px",
                            cursor: "pointer",
                            justifyContent: "center",
                            marginRight: "16px",
                            flexDirection: "column",
                            overflow: "hidden",
                            position: "relative"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                            const bottom = e.currentTarget.querySelector(".bottom") as HTMLElement;
                            if (bottom) bottom.style.background = "rgba(228, 80, 112, 1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                            const bottom = e.currentTarget.querySelector(".bottom") as HTMLElement;
                            if (bottom) bottom.style.background = "rgba(235, 87, 104, 1)";
                        }}
                        onClick={() => { navigate(`/projects/${project.id}`) }}
                    >
                        <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>{project.name}</strong>
                        <div
                            className="bottom"
                            style={{
                                flex: 1,
                                background: "rgba(235, 87, 104, 1)",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <p style={{alignContent: "center"}}>{project.description}</p>
                        </div>
                        {siteUser.role == "PROJECTMANAGER" && (
                            <div style={{
                                position: "absolute",
                                background: "black",
                                height: "40px",
                                width: "40px",
                                top: 0,
                                right: 0,
                                borderRadius: "10px",
                                textAlign: "center"
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = "rgba(179, 37, 49, 1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProject.mutate(project.id);
                                }}>
                                x
                            </div>
                        )}
                    </div>

                )) : (
                    <div style={{ marginTop: "-40px" }}>
                        <p>No projects available</p>
                        <NewProjectButton />
                    </div>
                )}
                {projects && projects.length > 0 && (
                    <div style={{ paddingLeft: "60px", marginBottom: "16px", alignSelf:"center" }}>
                        <NewProjectButton />
                    </div>
                )}
            </div>
        </div >

    )

}

export default ProjectList;