import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { ProjectCreateDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { useNavigate } from "react-router";
import { currentUser } from "../stores/userStore.ts";

export default function NewProjectPopup({ closeFunction }) {


    const siteUser = currentUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createProject = useMutation({
        mutationFn: async (projectDTO: ProjectCreateDTO) => {
            const res = await fetch(`${API_URL}/myProjects?userId=${siteUser.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectDTO),
            });
            if (!res.ok) throw new Error("Creation failed");
            return res.json();
        },
        onSuccess: (project) => {
            queryClient.invalidateQueries({ queryKey: ["projects", siteUser.id] })
            closeFunction();
            navigate("/projects/" + project.id);
        },
        onError: () => {
            console.log("No perms(?)");
        },
    });

    const [projectInfo, setProjectInfo] = useState({
        name: "",
        description: "",
    });

    const submitProject = (event: any) => {
        event.preventDefault();
        createProject.mutate(projectInfo);
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99
        }}
            onClick={closeFunction}>
            <div style={{
                width: "700px",
                height: "500px",
                background: "black",
                border: "2px solid white",
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "20px"
            }} onClick={e => e.stopPropagation()}>

                <h2 style={{ marginBottom: "10px" }}>Create Your Project</h2>


                <form onSubmit={submitProject} style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        margin: "8px",
                        justifyContent: "center"
                    }}>
                        <strong style={{ marginBottom: "6px" }}>Name:</strong>
                        <textarea
                            id="title"
                            name="title"
                            value={projectInfo.name}
                            onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
                            disabled={false}
                            style={{
                                width: "90%",
                                height: "60px",
                                background: "rgba(30, 30, 30, 1)",
                                border: "2px solid white",
                                borderRadius: "10px",
                                margin: "8px",
                                cursor: "text",
                                resize: "none"
                            }}

                        />
                    </div>

                    <div style={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        margin: "8px",
                        justifyContent: "center"
                    }}>
                        <strong style={{ marginBottom: "6px" }}>Description:</strong>
                        <textarea
                            id="description"
                            name="description"
                            value={projectInfo.description}
                            onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                            disabled={false}
                            style={{
                                width: "90%",
                                height: "120px",
                                background: "rgba(30, 30, 30, 1)",
                                border: "2px solid white",
                                borderRadius: "10px",
                                margin: "8px",
                                cursor: "text",
                                resize: "none"
                            }}
                        />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "20px"
                    }}>
                        <Button
                            variant="secondary"
                            style={{
                                width: "150px",
                                height: "40px",
                                lineHeight: "12px",
                                padding: "0px",
                            }}
                            onClick={closeFunction}
                        >
                            Back
                        </Button>

                        <Button
                            type="submit"
                            style={{
                                width: "150px",
                                height: "40px",
                                lineHeight: "12px",
                                padding: "0px",
                            }}
                            disabled={(projectInfo.name === "" || projectInfo.description === "")}
                        >
                            Create Project
                        </Button>
                    </div>
                </form>


            </div>
        </div>
    );
}