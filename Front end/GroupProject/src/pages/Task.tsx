
import TaskTitle from "../components/Task/TaskTitle.tsx";
import TaskDescription from "../components/Task/TaskDescription.tsx";
import TaskCommentField from "../components/Task/TaskCommentField.tsx";
import TaskCommentList from "../components/Task/TaskCommentList.tsx";
import type { ProjectDTO, TaskDTO } from "../types/models.js";
import { useParams } from "react-router";
import { currentUser } from "../stores/userStore.ts";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../api/config.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Task = () => {
    
    const { taskId } = useParams();
    const numericTaskId = Number(taskId);
    const queryClient = useQueryClient();
    const user = currentUser();
    const navigate = useNavigate();
    
    
    const { data: taskData, isLoading, error } = useQuery<TaskDTO>({
        queryKey: ["taskPage", numericTaskId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/tasks/${numericTaskId}`);
            if (!res.ok) throw new Error("Failed to load task");
            return await res.json();
        },
        enabled: !!taskId
    });
    
    if (isLoading) return <div>Loading task...</div>;
    if (error) return <div style={{ color: "red" }}>Error loading task.</div>;
    if (!taskData) return <div>No task found.</div>;
    
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
            background: "rgba(17, 17, 17, 1)",
            border: "2px solid white",
            borderRadius: "10px",
            flexDirection: "row",
            display: "flex",
            position: "relative"
        }}>
        
        <button
        style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            height: "22px",
            lineHeight: "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
        onClick={() => navigate(-1)}
        >
        Back
        </button>
        
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
        
        <TaskTitle />
        
        <TaskDescription />
        
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
        
        <strong style={{ display: "block", fontSize: "25px", textAlign: "center", margin: "8px" }}>Watchers:</strong>
        <p style={{ margin: 0, padding: 0 }}>
        {taskData.watchers.length > 0
            ? taskData.watchers.map(w => w.email).join(", ")
            : "No watchers"}</p>
            </div>
            
            </div>
            
           <div style={{
    width: "50%",
    height: "100%",
    background: "rgba(17, 17, 17, 1)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    boxSizing: "border-box"
}}>
    
        <div style={{ marginTop: "42px", width: "100%" }}>
        <TaskCommentField taskId={numericTaskId} />
    </div>

    <div style={{
        width: "100%",
        flex: 1,
        overflowY: "auto"
    }}>
        <TaskCommentList comments={taskData.comments} />
    </div>

</div>           
            </div>
            </div>
    )
        
        
    }
    
    export default Task