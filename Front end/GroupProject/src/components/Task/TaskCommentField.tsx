import { useState } from "react";
import { Button } from "react-bootstrap";
import type { CommentCreateDTO } from "../../types/models.js";
import { API_URL } from "../../api/config.ts";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { currentUser } from "../../stores/userStore.ts";

interface TaskCommentFieldProps {
  taskId: number;
}

const TaskCommentField = ({ taskId }: TaskCommentFieldProps) => {

    const user = currentUser();
    const queryClient = useQueryClient();

    const [commentText, setCommentText] = useState("");    

     const postNewComment = useMutation({
        mutationFn: async (dto: CommentCreateDTO) => {
            const res = await fetch(`${API_URL}/comments?userId=${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Comment creation failed");
            return res.json();
        },
        onSuccess: () => {
            setCommentText("");
            queryClient.invalidateQueries({ queryKey: ["taskPage"],
    });
        },
        
        onError: () => {
            console.log("Comment creation failed: unable to place comment.");
        },
    });

    const postComment = (event: any) => {
        event.preventDefault();

        if (commentText.trim().length === 0) return;

        postNewComment.mutate({
        body: commentText,
        taskId: taskId,
        userId: user.id
});

    };

    return (
        <form onSubmit={postComment} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <textarea
                id="description"
                name="description"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={false}
                style={{
                    width: "90%",
                    height: "80px",
                    background: "rgba(30, 30, 30, 1)",
                    border: "2px solid white",
                    borderRadius: "10px",
                    margin: "8px",
                    cursor: "text",
                    resize: "none"
                }}
            />
            <Button type="submit" style={{
                width: "200px",
                height: "40px",
                lineHeight: "12px",
                padding: "0px",
            }}
                disabled={commentText.trim() === ""}>
                submit
            </Button>
        </form>
    )

}

export default TaskCommentField