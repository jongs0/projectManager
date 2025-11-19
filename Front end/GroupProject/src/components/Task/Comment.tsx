import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "react-bootstrap";
import type { CommentUpdateDTO } from "../../types/models.js";
import { API_URL } from "../../api/config.ts";
import { currentUser } from "../../stores/userStore.ts";

const CommentComponent = ({ commentAuthor, body, commentId, authorId }) => {

    const user = currentUser();
    const isAuthor = user.id === authorId;
    const [showingButtons, showButtons] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [comment, setComment] = useState({
    body: body,
    commentId: commentId
});


        const handleEditcomment = useMutation({
        mutationFn: async (dto: CommentUpdateDTO) => {
            const res = await fetch(`${API_URL}/comments/${commentId}/edit?userId=${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Edit failed");
            return res.json();
        },
        onSuccess: (comment) => {
            setComment(comment);
            setEditing(false);
        },
        onError: () => {
            console.log("Edit failed: unable to edit comment");
        },
    });

    const editComment = () => {
        if (!isEditing) { setEditing(true);
        } else {
        handleEditcomment.mutate({ body: comment.body });
        }
    
    }

    return (
        <div style={{
            width: "90%",
            height: "100px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "6px",
            cursor: "pointer",
            position: "relative"
        }}
            onMouseOver={(e) => {
                 e.currentTarget.style.background = "rgba(19, 19, 19, 1)";
                if (isAuthor) showButtons(true); 
            }}
            onMouseLeave={(e) => {
                 e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                showButtons(false);
            }}
        > 
                {(!isEditing || !isAuthor) ? (
                <p style={{ display: "block", fontSize: "20px" }}>
                    {comment.body}
                </p>
            ) : (
                <textarea
                    style={{ display: "block", fontSize: "20px" }}
                    value={comment.body}
                    onChange={(e) => setComment({ ...comment, body: e.target.value })}
                    placeholder="Edit comment"
                />
            )}


            {showingButtons && isAuthor && (
                <Button style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    height: "12px",
                    lineHeight: "12px"
                }}
                    onClick={() => editComment()}
                >
                    {isEditing ? "save" : "edit"}</Button>
            )}

            <p style={{
                display: "block", fontSize: "20px", textAlign: "right", marginRight: "8px",
                bottom: "6px"
            }}>{commentAuthor}</p>
        </div>
    )

}

export default CommentComponent