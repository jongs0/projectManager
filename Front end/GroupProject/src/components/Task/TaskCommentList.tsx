import { useState } from "react";
import { Button } from "react-bootstrap";
import CommentComponent from "./Comment.tsx";


const TaskCommentList = ({ comments }) => {

    return (
        <div style={{
            flex: 1,
            width: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {comments && comments.length > 0 ? (
                comments.map((c: any) => (
                    <CommentComponent
                        key={c.id}
                        commentId={c.id}
                        body={c.body}
                        commentAuthor={c.appUserDto.email}
                        authorId={c.appUserDto.id}
                    />
                ))
            ) : (
                <p style={{ color: "gray", marginTop: "16px" }}>No comments yet.</p>
            )}
        </div>
    )
}

export default TaskCommentList