import { useState } from "react";
import { Button } from "react-bootstrap";

const CommentComponent = ({ username }) => {
    const [showingButtons, showButtons] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [commentText, setCommentText] = useState("comment text here");

    const editComment = () => {
        if (!isEditing) { setEditing(true); return; }
        //editComment.mutate
        setEditing(false); // move this into mutate function(?)
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
                showButtons(true);
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                showButtons(false);
            }}
        > {/* change this    vvv   to a check if the current user is the same as the comment's poster  */}
            {!isEditing && (true) ? <p style={{ display: "block", fontSize: "20px" }}>{commentText}</p> 
                :
                <textarea style={{ display: "block", fontSize: "20px" }}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                >{commentText}</textarea>}


            {(showingButtons) && (
                <Button style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    height: "12px",
                    lineHeight: "12px"
                }}
                    onClick={() => { editComment() }}
                >{isEditing ? "save" : "edit"}</Button>
            )}

            <p style={{
                display: "block", fontSize: "20px", textAlign: "right", marginRight: "8px",
                bottom: "6px"
            }}>{username}</p>
        </div>
    )

}

export default CommentComponent