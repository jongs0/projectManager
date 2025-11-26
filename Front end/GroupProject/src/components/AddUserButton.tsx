import { Button } from "react-bootstrap";
import { currentUser } from "../stores/userStore.ts";
import { useState } from "react";
import NewProjectPopup from "./NewProjectPopup.tsx";
import AddUserPopup from "./AddUserPopup.tsx";

const AddUserButton = ({team}) => {
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
                position: "absolute",
                bottom: "40px"
            }}
                onClick={() => { openMenu(true) }}>
                Add user..
            </Button>
            {isOpened && team && <AddUserPopup closeFunction={() => openMenu(false)} team={team} />}
        </>
    )

}

export default AddUserButton