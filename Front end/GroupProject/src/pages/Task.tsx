import { useState } from "react";
import CommentComponent from "../components/Comment.tsx";
import { Button } from "react-bootstrap";
import TaskTitle from "../components/Task/TaskTitle.tsx";
import TaskDescription from "../components/Task/TaskDescription.tsx";
import TaskCommentField from "../components/Task/TaskCommentField.tsx";
import TaskCommentList from "../components/Task/TaskCommentList.tsx";


const Task = () => {
    return (
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        }}>
            <div style={{
                width: "1000px",
                height: "700px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                flexDirection: "row",
                display: "flex"
            }}>
                <div style={{
                    width: "50%",
                    height: "100%",
                    background: "rgba(17, 17, 17, 1)",
                    border: "2px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>

                    <TaskTitle/>

                    <TaskDescription/>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <strong style={{ display: "block", fontSize: "25px", textAlign: "center", margin: "8px" }}>Members:</strong>
                        <p style={{ margin: 0, padding: 0 }}>name1, name2, etc</p> {/* zet om naar list */}
                    </div>

                </div>

                <div style={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <TaskCommentField/>
                    <TaskCommentList/>
                </div>

            </div>
        </div >
    )

}

export default Task