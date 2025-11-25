import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { currentUser } from "../stores/userStore.ts";
import { API_URL } from "../api/config.ts";
import { useState } from "react";

interface TaskComponentProps {
    taskName: string,
    taskId: number,
    projectId: number,
    done: boolean;
    isWatching: boolean;
    userRole: string;

}

const TaskComponent = ({ taskName, taskId, projectId, done, isWatching, userRole  }: TaskComponentProps) => {
    const navigate = useNavigate();
    const siteUser = currentUser();
    const queryClient = useQueryClient();
    const [showButtons, setShowButtons] = useState(false);

    const toggleWatch = useMutation({
        mutationFn: async () => {
            const method = isWatching ? "DELETE" : "POST";
            await fetch(`${API_URL}/tasks/${taskId}/watchingUsers/${siteUser.id}`, {
                method
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
        }
    });

    const toggleDone = useMutation({
        mutationFn: async () => {
            await fetch(
                `${API_URL}/tasks/${taskId}/toggleDone?userId=${siteUser.id}`,
                { method: "PUT" }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
        }
    });

    const deleteTask = useMutation({
        mutationFn: async () => {
            await fetch(
                `${API_URL}/tasks/${taskId}?userId=${siteUser.id}`,
                { method: "DELETE" }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
        }
    });

    return (
        <div style={{
            width: "268px",
            height: "100px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "16px",
            cursor: "pointer",
            position: "relative"
        }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)"; setShowButtons(true); }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)"; setShowButtons(false); }}
            onClick={() => { navigate(`/projects/${projectId}/task/${taskId}`) }}
        >
            <p style={{ height: "100%", display: "block", fontSize: "25px", textAlign: "center", alignContent: "center" }}>{taskName}</p>


            {isWatching && !showButtons && (<strong
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0, 0, 0, 0.4)",
                    padding: "4px"
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
            </strong>)}

            {userRole !== "CLIENT" && showButtons && (

                <button
                    style={{
                        position: "absolute",
                        top: "6px",
                        left: "6px",
                        padding: "2px 6px",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWatch.mutate();
                    }}
                >
                    {isWatching ? "unwatch" : "watch"}
                </button>
            )}

            {userRole !== "CLIENT" && showButtons && (
                <button
                    style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        padding: "2px 6px",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDone.mutate();
                    }}
                >
                    {done ? "undo" : "done"}
                </button>
            )}

            {userRole !== "CLIENT" && showButtons && (
                <button
                    style={{
                        position: "absolute",
                        bottom: "6px",
                        right: "6px",
                        padding: "2px 6px",
                        fontSize: "12px",
                        cursor: "pointer",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm("Delete this task?")) {
                            deleteTask.mutate();
                        }
                    }}
                >
                    delete
                </button>
            )}
        </div>
    )
}

export default TaskComponent