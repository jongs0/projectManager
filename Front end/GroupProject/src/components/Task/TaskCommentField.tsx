import { useState } from "react";
import { Button } from "react-bootstrap";


const TaskCommentField = () => {
    const [commentText, setCommentText] = useState("");

    const postComment = (event: any) => {
        event.preventDefault();
        //postNewComment.mutate(); 
        setCommentText("");
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
                disabled={commentText == ""}>
                submit
            </Button>
        </form>
    )

}

export default TaskCommentField