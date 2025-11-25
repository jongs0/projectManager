import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { AppUserDTO, ProjectCreateDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { useNavigate } from "react-router";
import { currentUser } from "../stores/userStore.ts";

export default function AddUserPopup({ closeFunction, team }) {

    if (!team) return null;
    const teamId = team.id;

    const siteUser = currentUser();
    const queryClient = useQueryClient();
    //const navigate = useNavigate();

    const {
        data: users,
        isLoading,
        error,
    } = useQuery<AppUserDTO[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/users/all`);
            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }
            return response.json();
        },
    });

    const addUser = useMutation({
        mutationFn: async (userId: number) => {
            const res = await fetch(`${API_URL}/teams/${teamId}/add/${userId}?pmId=${siteUser.id}`, {
                method: "POST"
            });
            if (!res.ok) throw new Error("Creation failed");
            return res.json();
        },
        onSuccess: () => {
            const numericTeamId = Number(teamId);
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["teams", numericTeamId] });
            closeFunction();
        },
        onError: () => {
            console.log("No perms(?)");
        },
    });

    const [searchString, setSearchString] = useState("")

    const filteredUsers = users?.filter(u =>
        !team.teamMembers.some(tm => tm.id === u.id) &&
        (u.teamDtos.length === 0)).filter(u =>
            u.email.toLowerCase().includes(searchString.toLowerCase()));

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
                width: "1000px",
                height: "700px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }} onClick={e => e.stopPropagation()}>
                <textarea
                    id="description"
                    name="description"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    disabled={false}
                    placeholder="Search"
                    style={{
                        width: "90%",
                        height: "90px",
                        background: "rgba(30, 30, 30, 1)",
                        border: "2px solid white",
                        borderRadius: "10px",
                        margin: "8px",
                        cursor: "text",
                        resize: "none",
                        fontSize: "30px",
                        marginTop: "18px"
                    }}
                />
                {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers?.map((user) => (
                        <div key={user.id}
                            style={{
                                width: "80%",
                                height: "80px",
                                background: "black",
                                border: "2px solid white",
                                borderRadius: "10px",
                                margin: "8px",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                overflowY: "scroll",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                paddingLeft: "12px",
                                fontSize: "25px"
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)" }}
                            onClick={() => { addUser.mutate(user.id) }}>
                            {user.email}
                        </div>))
                ) : (
                    <div
                        style={{
                            width: "90%",
                            height: "60px",
                            margin: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0.8
                        }}
                    >
                        No users found.
                    </div>
                )}



            </div>
        </div>
    );
}