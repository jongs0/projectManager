import { useNavigate } from "react-router";


const ProjectList = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "16px", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <div
                style={{
                    height: "250px",
                    width: "400px",
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
                onClick={() => {navigate("/projects/1")}}
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




            <div
                style={{
                    height: "250px",
                    width: "400px",
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

    )

}

export default ProjectList;