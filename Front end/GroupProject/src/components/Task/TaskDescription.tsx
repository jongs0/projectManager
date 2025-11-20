import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import type { TaskDTO, TaskUpdateDTO } from "../../types/models.js";
import { currentUser } from "../../stores/userStore.ts";
import { API_URL } from "../../api/config.ts";
import { useParams } from "react-router";


const TaskDescription = () => {

    const user = currentUser();
    const { taskId } = useParams();

    const { data: taskData, refetch } = useQuery<TaskDTO>({
    queryKey: ["task", taskId],
    queryFn: async () => {
        const res = await fetch(`${API_URL}/tasks/${taskId}`);
        if (!res.ok) throw new Error("Failed to load task");
        return await res.json();
    },
    enabled: !!taskId,
});
    
    const [descText, setDescText] = useState("");

    useEffect(() => {
        if (taskData) {
            setDescText(taskData.body);
        }
    }, [taskData]);

    const isClient = user.role === "CLIENT";

      const editDesc = useMutation({
        mutationFn: async (dto: TaskUpdateDTO) => {
            const res = await fetch(`${API_URL}/tasks/?userId=${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Update failed.");
            return res.json();
        },
        onSuccess: () => {
            refetch();
        },
        
        onError: () => {
            console.log("Description creation failed: unable to place description.");
        },
    });

    const handleSave = (e: any) => {
        e.preventDefault();

        editDesc.mutate({
            name: taskData?.name || "",
            description: descText
        });
    };

    return (
        <form onSubmit={handleSave} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <textarea
                    id="title"
                    name="title"
                    value={descText}
                    onChange={(e) => setDescText(e.target.value)}
                    disabled={isClient}
                    style={{
                        width: "90%",
                        height: "200px",
                        background: "black",
                        border: "2px solid white",
                        borderRadius: "10px",
                        margin: "8px",
                        cursor: "text",
                        resize: "none"
                    }}
                />

                {!isClient && taskData && taskData.body !== descText && (
                <Button type="submit" style={{
                width: "200px",
                flexDirection: "column",
                alignItems: "center"
                }}>submit</Button>
            )}
            </div>
        </form>
    )
}

export default TaskDescription