import { useState } from "react";
import { Button } from "react-bootstrap";
import CommentComponent from "./Comment.tsx";


import type { CommentSummaryDTO } from "../../types/models.js";

interface TaskCommentListProps {
    comments: CommentSummaryDTO[];
}

const TaskCommentList = ({ comments }: TaskCommentListProps) => {
    
    return (
        <div style={{
            flex: 1,
            width: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 20px"
        }}>
        {comments && comments.length > 0 ? (
            comments.map((c) => (
                
                <div
                        key={c.id}
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "12px"
                        }}
                    >
                        <div style={{ width: "90%" }}>
                            <CommentComponent
                                commentId={c.id}
                                body={c.body}
                                commentAuthor={c.appUserDto.email}
                                authorId={c.appUserDto.id}
                            />
                        </div>
                    </div>
            ))
        ) : (
            <p style={{ color: "gray", marginTop: "16px" }}>No comments yet.</p>
        )}
        </div>
    )
}

export default TaskCommentList