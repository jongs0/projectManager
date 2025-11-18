import { useState } from "react";


const Task = () => {

    const [descText, setDesc] = useState("");


    const handleDescChange = () => {
        console.log("Comment deleted: " + "[id here]");
        //editDesc.mutate();
    };


    return (
        <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        }}>
            <div style={{
                width: "1000px",
                height: "700px",
                background: "black",
                border: "2px solid white",
                borderRadius: "10px",
                flexDirection: "row",
                display: "flex"
            }}>
                <div style={{
                    width: "60%",
                    height: "100%",
                    background: "rgba(17, 17, 17, 1)",
                    border: "2px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>

                    <form onSubmit={handleDescChange} style={{ width: "100%" }}>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <strong style={{ display: "block", fontSize: "30px", textAlign: "center", margin: "8px" }}>[Task name]</strong>
                            <textarea
                                id="description"
                                name="description"
                                value={descText}
                                onChange={(e) => setDesc(e.target.value)}
                                disabled={false}
                                style={{
                                    width: "90%",
                                    height: "200px",
                                    background: "black",
                                    border: "2px solid white",
                                    borderRadius: "10px",
                                    margin: "8px",
                                    cursor: "pointer",
                                    resize: "none"
                                }}
                            />
                        </div>
                    </form>

                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <strong style={{ display: "block", fontSize: "25px", textAlign: "center", margin: "8px" }}>Members:</strong>
                        <p style={{ margin: 0, padding: 0 }}>name1, name2, etc</p>
                    </div>

                </div>
                <div style={{
                    width: "40%",
                    height: "100%"
                }}>
                    <>bbb</>
                </div>

            </div>
        </div >
    )

}

export default Task