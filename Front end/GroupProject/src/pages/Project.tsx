import TaskComponent from "../components/Task/TaskComponent.tsx";


const Project = () => {

    return (
        <div style={{ flex: 1, display: "flex", }}>
            <div style={{
                width: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                margin: "16px",
            }}>
                <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>Teams</strong>
            </div>




            <div style={{ marginLeft: "0px", margin: "16px"}}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Backlog</strong>
                <div style={{
                    flex:1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    marginTop: "8px", 
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                </div>
            </div>


            <div style={{ marginLeft: "0px", margin: "16px"}}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Done</strong>
                <div style={{
                    flex:1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    marginTop: "8px", 
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                    <TaskComponent/>
                </div>
            </div>

        </div>

    )

}

export default Project;