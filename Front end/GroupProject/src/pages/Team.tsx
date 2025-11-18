import { Button } from "react-bootstrap";
import TaskComponent from "../components/TaskComponent.tsx";
import UserComponent from "../components/userComponent.tsx";


const Team = () => {

    return (
        <div style={{ flex: 1, display: "flex", }}>
            <div style={{
                width: "300px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                margin: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>Users</strong>
                <div style={{
                    flex: 1,
                    height: "calc(100vh - 160px)",
                    width: "300px",
                    marginTop: "8px",
                    overflowY: "scroll",
                    overflowX: "hidden"
                }}>
                    <UserComponent />
                    <UserComponent />
                    <UserComponent />
                    <UserComponent />
                </div>

                <Button style={{
                    width: "150px",
                    height: "80px",
                    lineHeight: "40px",
                    padding: "0px",
                    margin: "4px",
                    position: "absolute",
                    bottom: "40px"
                }}
                    onClick={() => {/* delete user here */ }}>
                    Add user..
                </Button>

            </div>

            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <div
                style={{
                    height: "400px",
                    width: "600px",
                    display: "flex",
                    marginBottom: "16px",
                    border: "2px solid white",
                    borderRadius: "10px",
                    cursor: "pointer",
                    justifyContent: "center",
                    marginRight: "16px",
                    flexDirection: "column",
                    overflow: "hidden"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 1)";
                    const bottom = e.currentTarget.querySelector(".bottom") as HTMLElement;
                    if (bottom) bottom.style.background = "rgba(228, 80, 112, 1)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0)";
                    const bottom = e.currentTarget.querySelector(".bottom") as HTMLElement;
                    if (bottom) bottom.style.background = "rgba(235, 87, 104, 1)";
                }}
                onClick={() => { /*link to project page here */ }}
            >
                <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>project name</strong>
                <div
                    className="bottom"
                    style={{
                        flex: 1,
                        background: "rgba(235, 87, 104, 1)",
                    }}
                />
            </div>
            </div>



        </div>

    )

}

export default Team;