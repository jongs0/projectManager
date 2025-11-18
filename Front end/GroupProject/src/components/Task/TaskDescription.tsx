import { useState } from "react";
import { Button } from "react-bootstrap";


const TaskDescription = () => {
    const [savedDesc, setSavedDesc] = useState("description"); // zet hier de desc in met een query pull
    const [descText, setDescText] = useState(savedDesc);

    const handleDescChange = (event: any) => {
        event.preventDefault();
        //editDesc.mutate();
        setSavedDesc(descText);
    };

    return (
        <form onSubmit={handleDescChange} style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <textarea
                    id="title"
                    name="title"
                    value={descText}
                    onChange={(e) => setDescText(e.target.value)}
                    disabled={false}
                    style={{
                        width: "90%",
                        height: "200px",
                        background: "black",
                        border: "2px solid white",
                        borderRadius: "10px",
                        margin: "8px",
                        cursor: "text",
                        resize: "none"
                    }}
                />
            </div>
            {(savedDesc != descText && (<Button type="submit" style={{
                width: "200px",
                flexDirection: "column",
                alignItems: "center"
            }}>submit</Button>))}
        </form>
    )
}

export default TaskDescription