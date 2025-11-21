import { useNavigate } from "react-router";

interface TeamComponentProps {
    teamId: number;
    teamName: string;
}

const TeamComponent = ({ teamId, teamName }: TeamComponentProps) => {
    const navigate = useNavigate();
    return (
        <div style={{
            width: "268px",
            height: "60px",
            background: "black",
            border: "2px solid white",
            borderRadius: "10px",
            margin: "16px",
            cursor: "pointer"
        }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(19, 19, 19, 1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 1)")}
            onClick={() => navigate(`/teams/${teamId}`)}
        >
            <strong style={{ display: "block", fontSize: "30px", textAlign: "center" }}>{teamName}</strong>
        </div>
    )

}

export default TeamComponent