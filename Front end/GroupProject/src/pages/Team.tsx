import { Button } from "react-bootstrap";
import TaskComponent from "../components/TaskComponent.tsx";
import UserComponent from "../components/userComponent.tsx";
import { useNavigate, useParams } from "react-router";
import { currentUser } from "../stores/userStore.ts";
import { useQuery } from "@tanstack/react-query";
import type { TeamDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import AddUserButton from "../components/AddUserButton.tsx";


const Team = () => {


    const { teamId } = useParams<{ teamId: string }>();

    const numericTeamId = Number(teamId);

    const userLogin = currentUser();
    const navigate = useNavigate();

    const {
        data: team,
        isLoading,
        error,
    } = useQuery<TeamDTO>({
        queryKey: ["teams", numericTeamId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/teams/${numericTeamId}?userId=${userLogin.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch team");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading team...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error.message}</div>;
    }


    const managers = team?.teamMembers?.filter(u => u.role === "PROJECTMANAGER") ?? [];
    const developers = team?.teamMembers?.filter(u => u.role === "DEVELOPER") ?? [];
    const clients = team?.teamMembers?.filter(u => u.role === "CLIENT") ?? [];

    return (
        <div style={{ flex: 1, display: "flex", }}>
            <div style={{
                width: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                margin: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

            }}>
                <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>Users</strong>
                <div style={{
                    flex: 1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    marginTop: "8px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    {managers.length > 0 && (
                        <>
                            <p style={{ display: "block", fontSize: "30px", textAlign: "center", marginBottom: "0px" }}>Project Manager</p>
                            {managers.map(user => (
                                <UserComponent key={user.id} userId={user.id} teamId={numericTeamId} />
                            ))}
                        </>
                    )}

                    {developers.length > 0 && (
                        <>
                            <p style={{ display: "block", fontSize: "30px", textAlign: "center", marginBottom: "0px", marginTop: "8px" }}>Developer</p>
                            {developers.map(user => (
                                <UserComponent key={user.id} userId={user.id} teamId={numericTeamId} />
                            ))}
                        </>
                    )}

                    {clients.length > 0 &&
                        <>
                            <p style={{ display: "block", fontSize: "30px", textAlign: "center", marginBottom: "0px", marginTop: "8px" }}>Client</p>
                            {clients.map(user => (
                                <UserComponent key={user.id} userId={user.id} teamId={numericTeamId} />
                            ))}
                        </>
                    }
                </div>

                <AddUserButton team={team} />

            </div>

            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div
                    style={{
                        height: "400px",
                        width: "600px",
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
                    onClick={() => { navigate(`/projects/${team?.project.id}`) }}
                >
                    <strong
                        style={{
                            fontSize: "30px",
                            textAlign: "center",
                            padding: "16px",
                            background: "black",
                            justifyContent: "center"
                        }}
                    >
                        {team?.project.name}
                    </strong>

                    <div
                        className="bottom"
                        style={{
                            flex: 1,
                            background: "rgba(235, 87, 104, 1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <p style={{ margin: 0, textAlign: "center", color: "white" }}>
                            {team?.project.description}
                        </p>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Team