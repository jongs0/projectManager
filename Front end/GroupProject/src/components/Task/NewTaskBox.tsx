import { useState } from "react";
import { currentUser } from "../../stores/userStore.ts";
import { useMutation } from "@tanstack/react-query";
import type { TaskCreateDTO } from "../../types/models.js";
import { API_URL } from "../../api/config.ts";


interface NewTaskBoxProps {
    projectId: number;
    refreshTasks: () => void;
}

const NewTaskBox = ({ projectId, refreshTasks }: NewTaskBoxProps) => {

    const user = currentUser();

    const [isOpen, setIsOpen] = useState(false);
    const [taskName, setTaskName] = useState("");

    const createTask = useMutation({
        mutationFn: async (dto: TaskCreateDTO) => {
            const res = await fetch(`${API_URL}/tasks?userId=${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });

            if (!res.ok) throw new Error("Failed to create task");
            return res.json();
        },

        onSuccess: () => {
            setTaskName("");
            setIsOpen(false);
            refreshTasks();
        }
    });

    if (!isOpen) return (
        <div
            onClick={() => setIsOpen(true)}
            style={{
                width: "268px",
                height: "100px",
                margin: "16px",
                border: "2px dashed white",
                borderRadius: "10px",
                background: "rgba(0,0,0,0.4)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)"; }}
        >
            + Add Task
        </div>
    );

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                createTask.mutate({
                    projectId: projectId,
                    name: taskName,
                    description: ""
                });
            }}
            style={{
                width: "268px",
                margin: "16px",
                padding: "10px",
                border: "2px solid white",
                borderRadius: "10px",
                background: "black",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task name..."
                style={{
                    padding: "8px",
                    background: "rgba(30,30,30,1)",
                    border: "1px solid gray",
                    color: "white",
                    borderRadius: "6px",
                    margin: "0px"
                }}
            />

            <button
                type="submit"
                disabled={!taskName.trim()}
                style={{
                    padding: "8px",
                    borderRadius: "6px",
                    background: "#1d75ff",
                    color: "white",
                    cursor: "pointer",
                    margin: "0px"
                }}
            >
                Create
            </button>

            <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                    padding: "6px",
                    borderRadius: "6px",
                    background: "gray",
                    color: "white",
                    cursor: "pointer",
                    margin: "0px"
                }}
            >
                Cancel
            </button>
        </form>
    );
};

export default NewTaskBox;
