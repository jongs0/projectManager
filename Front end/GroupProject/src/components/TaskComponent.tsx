import { useNavigate } from "react-router";


const TaskComponent = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            width: "268px",
            height: "100px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "16px",
            cursor: "pointer"
        }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(19, 19, 19, 1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 1)")}
            onClick={() => { navigate("/projects/1/task/1"); console.log("a") }}
        >
            <p style={{ display: "block", fontSize: "25px", textAlign: "center" }}>todo: i forgor</p>
        </div>
    )

}

export default TaskComponent