import { Button } from "react-bootstrap";
import { currentUser } from "../stores/userStore.ts";
import { useState } from "react";
import NewProjectPopup from "./NewProjectPopup.tsx";

const NewProjectButton = () => {
    const user = currentUser();

    const [isOpened, openMenu] = useState(false);

    if (user.role == "PROJECTMANAGER") return (
        <>
            <Button style={{
                width: "150px",
                height: "80px",
                lineHeight: "40px",
                padding: "0px",
                margin: "4px",
            }}
                onClick={() => { openMenu(true) }}>
                Create project..
            </Button>


            {isOpened && <NewProjectPopup closeFunction={() => openMenu(false)}/>}
        </>
    )

}

export default NewProjectButton