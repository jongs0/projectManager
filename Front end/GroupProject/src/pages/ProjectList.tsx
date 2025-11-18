import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { ProjectDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { currentUser } from "../stores/userStore.ts";


const ProjectList = () => {

    const navigate = useNavigate();

    const userLogin = currentUser();

    const {
        data: projects,
        isLoading,
        error,
    } = useQuery<ProjectDTO[]>({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/myProjects?userId=${userLogin.id}`);
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
                            overflow: "hidden"
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
                            }}
                        />
                    </div>
                )) : (
                    <p>No projects available</p>
                )}
            </div >
        </div >

    )

}

export default ProjectList;