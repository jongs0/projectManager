import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { currentUser } from "../../stores/userStore.ts";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { TaskDTO, TaskUpdateDTO } from "../../types/models.js";
import { API_URL } from "../../api/config.ts";


const TaskTitle = () => {

    const user = currentUser();
    const { taskId } = useParams();

    const { data: taskData, refetch } = useQuery<TaskDTO>({
        queryKey: ["taskPage", taskId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/tasks/${taskId}`);
            if (!res.ok) throw new Error("Failed to load task");
            return await res.json();
        },
        enabled: !!taskId
    });

    const [titleText, setTitleText] = useState("");
    const [isEditingTitle, setEditingTitle] = useState(false);

    useEffect(() => {
        if (taskData) {
            setTitleText(taskData.name);
        }
    }, [taskData]);

    const isClient = user.role === "CLIENT";

    const editTitle = useMutation({
        mutationFn: async (dto: TaskUpdateDTO) => {
            const res = await fetch(`${API_URL}/tasks/${taskId}?userId=${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: () => {
            refetch();
            setEditingTitle(false);
        }
    });


    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!taskData) return;

        editTitle.mutate({
            name: titleText,
            description: taskData?.body ?? ""
        });
    };

    if (!taskData) return <strong style={{ fontSize: "30px" }}>Loading...</strong>;

    return (
        <>
            {isEditingTitle ? (
                <form onSubmit={handleSubmit} style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <textarea
                        id="description"
                        name="description"
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        disabled={isClient}
                        style={{
                            margin: "8px",
                            cursor: "text",
                            resize: "none", display: "block", fontSize: "30px", textAlign: "center",
                            background: "rgba(30, 30, 30, 1)",
                        }}
                    />
                    {!isClient && (
                        <Button type="submit" style={{
                            width: "200px",
                            height: "40px",
                            lineHeight: "12px",
                            padding: "0px",
                        }}
                            disabled={titleText == ""}>
                            {titleText !== taskData.name ? "save" : "cancel"}
                        </Button>
                    )}
                </form>
            ) : (
                <strong style={{ display: "block", fontSize: "30px", textAlign: "center", margin: "8px" }}
                    onClick={() => {
                        if (!isClient) setEditingTitle(true);
                    }}
                >
                    {titleText}
                </strong>)}
        </>

    )

}

export default TaskTitle