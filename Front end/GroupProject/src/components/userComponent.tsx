import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import type { AppUserDTO, Role } from "../types/models.js";
import { API_URL } from "../api/config.ts";
import { currentUser } from "../stores/userStore.ts";


const UserComponent = ({ userId, teamId }) => {


    const siteUser = currentUser();
    const queryClient = useQueryClient();

    const changeRole = useMutation({
        mutationFn: async (role: Role) => {
            const res = await fetch(`${API_URL}/users/${userId}/role/${role}?senderId=${siteUser.id}`, {
                method: "PATCH",
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", userId]})
        }
    });


    const removeUser = useMutation({
        mutationFn: async (userId : number) => {
            const res = await fetch(`${API_URL}/teams/${teamId}/delete/${userId}?pmId=${siteUser.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams", teamId]})
        }
    });

    const navigate = useNavigate();

    const [isOpened, openMenu] = useState(false);

    const {
        data: user,
        isLoading,
        error,
    } = useQuery<AppUserDTO>({
        queryKey: ["user", userId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/users/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div>Loading user...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Error: {error.message}</div>;
    }

    return (
        <div style={{
            width: "268px",
            height: "60px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "16px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
        }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)"; openMenu(false) }}
            onClick={() => { if (user?.id != siteUser.id && siteUser.role == "PROJECTMANAGER") openMenu(true) }}
        >
            <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>{user?.email}</strong>
            {isOpened && <div style={{
                position: "absolute",
                width: "268px",
                height: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                marginLeft: "260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Edit</strong>
                <p style={{ display: "block", fontSize: "20px", textAlign: "center", marginBottom: "0px" }}>Set to..</p>

                <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                disabled = {user?.role == "PROJECTMANAGER"}
                    onClick={() => { changeRole.mutate("PROJECTMANAGER") }}>
                    Proj. manager
                </Button>

                <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                disabled = {user?.role == "DEVELOPER"}
                    onClick={() => { changeRole.mutate("DEVELOPER") }}>
                    Developer
                </Button>

                <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                disabled = {user?.role == "CLIENT"}
                    onClick={() => { changeRole.mutate("CLIENT") }}>
                    Viewer
                </Button>

                {user && (
                <Button style={{
                    width: "80px",
                    height: "50px",
                    lineHeight: "20px",
                    padding: "0px",
                    margin: "4px",
                    position: "absolute",
                    bottom: "0px"
                }}
                    onClick={() => { removeUser.mutate(user.id) }}>
                    Remove user
                </Button>)}

            </div>}



        </div>
    )

}

export default UserComponent