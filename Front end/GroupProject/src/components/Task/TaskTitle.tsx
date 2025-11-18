import { useState } from "react";
import { Button } from "react-bootstrap";


const TaskTitle = () => {


    const [titleText, setTitleText] = useState("Title"); // query
    const [isEditingTitle, setEditingTitle] = useState(false);

    const handleTitleChange = (event: any) => {
        event.preventDefault();
        //editTitle.mutate();
        setEditingTitle(false);
    };


    return (
        <>
            {isEditingTitle ? (
                <form onSubmit={handleTitleChange} style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <textarea
                        id="description"
                        name="description"
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        disabled={false}
                        style={{
                            margin: "8px",
                            cursor: "text",
                            resize: "none", display: "block", fontSize: "30px", textAlign: "center",
                            background: "rgba(30, 30, 30, 1)",
                        }}
                    />
                    <Button type="submit" style={{
                        width: "200px",
                        height: "40px",
                        lineHeight: "12px",
                        padding: "0px",
                    }}
                        disabled={titleText == ""}>
                        submit
                    </Button>
                </form>) :
                (<strong style={{ display: "block", fontSize: "30px", textAlign: "center", margin: "8px" }}
                    onClick={() => { setEditingTitle(true) }}>
                    {titleText}
                </strong>)}
        </>

    )

}

export default TaskTitle