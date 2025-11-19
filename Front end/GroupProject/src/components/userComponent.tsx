import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";


const UserComponent = () => {
    const navigate = useNavigate();

    const [isOpened, openMenu] = useState(false);
    // cursor: {isOpened ? "cursor" : ""},
    return (
        <div style={{
            width: "268px",
            height: "60px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "16px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
        }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(19, 19, 19, 1)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 0, 0, 1)"; openMenu(false) }}
            onClick={() => { openMenu(true) }}
        >
            <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>username</strong>
            {isOpened && <div style={{
                position: "absolute",
                width: "268px",
                height: "250px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                marginLeft: "260px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <strong style={{ display: "block", fontSize: "25px", textAlign: "center" }}>Edit</strong>
                <p style={{ display: "block", fontSize: "20px", textAlign: "center", marginBottom: "0px" }}>Set to..</p>

                {/* vv change true to user type detection */}
                {true && <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                    onClick={() => {/*set to admin here */ }}>
                    Admin
                </Button>}

                {/* vv change false to user type detection */}
                {false && <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                    onClick={() => {/*set to dev here */ }}>
                    Developer
                </Button>}

                {/* vv change true to user type detection */}
                {true && <Button style={{
                    width: "200px",
                    height: "40px",
                    lineHeight: "12px",
                    padding: "0px",
                    margin: "4px"
                }}
                    onClick={() => {/*set to viewer here */ }}>
                    Viewer
                </Button>}


                <Button style={{ 
                    width: "80px",
                    height: "50px",
                    lineHeight: "20px",
                    padding: "0px",
                    margin: "4px",
                    position: "absolute",
                    bottom: "0px"
                }}
                onClick={() => {/* delete user here */}}>
                    Delete user
                </Button>

            </div>}



        </div>
    )

}

export default UserComponent