import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { AppUserDTO, ProjectCreateDTO } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { useNavigate } from "react-router";
import { currentUser } from "../stores/userStore.ts";

export default function AddUserPopup({ closeFunction, team }) {


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
            const res = await fetch(`${API_URL}/teams/${team.id}/add/${userId}?pmId=${siteUser.id}`, {
                method: "POST"
            });
            if (!res.ok) throw new Error("Creation failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"]});
            queryClient.invalidateQueries({ queryKey: ["teams", team.id]})
            closeFunction();
        },
        onError: () => {
            console.log("No perms(?)");
        },
    });

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
                {(users && users.length > 0) && users.map((user) => (
                    <>
                        <div key={user.id}
                            style={{
                                width: "90%",
                                height: "60px",
                                background: "black",
                                border: "2px solid white",
                                borderRadius: "10px",
                                margin: "16px",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "row",
                                overflowY: "scroll",
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)" }}
                            onClick={() => {addUser.mutate(user.id)} }>
                            <p>{user.email}</p>
                        </div>
                    </>))}


            </div>
        </div>
    );
}