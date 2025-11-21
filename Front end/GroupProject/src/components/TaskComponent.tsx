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
    
}

const TaskComponent = ({ taskName, taskId, projectId, done, isWatching }: TaskComponentProps) => {
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
            queryClient.invalidateQueries({ queryKey: ["projects", projectId.toString()] });
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
            queryClient.invalidateQueries({ queryKey: ["projects", projectId.toString()] });
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
        <p style={{ display: "block", fontSize: "25px", textAlign: "center" }}>{taskName}</p>
        
        {showButtons && (
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
        
        {showButtons && (
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
        </div>
    )
}

export default TaskComponent