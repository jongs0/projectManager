import { Button } from "react-bootstrap";
import { currentUser } from "../stores/userStore.ts";
import { useState } from "react";
import NewTeamPopup from "./NewTeamPopup.tsx";

const NewTeamButton = ({ projectID }) => {
    const user = currentUser();

    const [isOpened, openMenu] = useState(false);

    if (user.role == "PROJECTMANAGER") return (
        <>
            <div
                style={{
                    width: "268px",
                    height: "60px",
                    border: "2px dashed white",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.4)",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "16px",
                    cursor: "pointer"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)"; }}
                onClick={() => { openMenu(true) }}
            >
                + Create team
            </div>


            {isOpened && <NewTeamPopup projectID={projectID} closeFunction={() => openMenu(false)} />}
        </>
    )

}

export default NewTeamButton