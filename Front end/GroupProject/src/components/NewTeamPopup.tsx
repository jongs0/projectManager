import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { ProjectCreateDTO, TeamCreateDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { useNavigate } from "react-router";
import { currentUser } from "../stores/userStore.ts";

export default function NewTeamPopup({ projectID, closeFunction }) {


    const siteUser = currentUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createTeam = useMutation({
        mutationFn: async (teamName: TeamCreateDTO) => {
            const res = await fetch(`${API_URL}/teams?userId=${siteUser.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(teamName),
            });
            if (!res.ok) throw new Error("Creation failed");
            return res.json();
        },
        onSuccess: (project) => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectID] })
            closeFunction();
        },
        onError: () => {
            console.log("No perms(?)");
        },
    });

    const [teamInfo, setTeamInfo] = useState({
        projectId: 1,
        name: ""
    });

    const submitProject = (event: any) => {
        event.preventDefault();
        createTeam.mutate(teamInfo);
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
                height: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "14px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "20px"
            }} onClick={e => e.stopPropagation()}>

                <h2 style={{ marginBottom: "10px" }}>Create a team</h2>

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
                            value={teamInfo.name}
                            onChange={(e) => setTeamInfo({ ...teamInfo, name: e.target.value })}
                            disabled={false}
                            style={{
                                width: "95%",
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
                            disabled={(teamInfo.name === "")}
                        >
                            Create team
                        </Button>
                    </div>
                </form>


            </div>
        </div>
    );
}