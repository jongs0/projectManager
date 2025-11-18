import { useState } from "react";
import { Button } from "react-bootstrap";
import CommentComponent from "../Comment.tsx";


const TaskCommentList = () => {

    return (
        <div style={{
            flex: 1,
            width: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <CommentComponent username="username" />  {/* zet om naar list, en geef username hier door */}
            <CommentComponent username="abc" />
            <CommentComponent username="abc" />
            <CommentComponent username="abc" />
            <CommentComponent username="abc" />
            <CommentComponent username="abc" />
        </div>
    )
}

export default TaskCommentList