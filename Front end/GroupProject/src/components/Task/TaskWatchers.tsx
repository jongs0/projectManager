import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { currentUser } from "../../stores/userStore.ts";
import { API_URL } from "../../api/config.ts";
import type { AppUserSummaryDTO, TaskDTO } from "../../types/models.js";


interface TaskWatchersProps {
    teamMembers: AppUserSummaryDTO[];
}

const TaskWatchers = ({ teamMembers }: TaskWatchersProps) => {
    const { taskId } = useParams();
    const user = currentUser();

    const { data: taskData, refetch } = useQuery<TaskDTO>({
        queryKey: ["taskWatchers", taskId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/tasks/${taskId}`);
            if (!res.ok) throw new Error("Failed to load task watchers");
            return await res.json();
        },
        enabled: !!taskId
    });

    const addWatcher = useMutation({
        mutationFn: async (memberId: number) => {
            await fetch(`${API_URL}/tasks/${taskId}/watchingUsers/${memberId}`, {
                method: "POST"
            });
        },
        onSuccess: () => refetch()
    });

    const removeWatcher = useMutation({
        mutationFn: async (memberId: number) => {
            await fetch(`${API_URL}/tasks/${taskId}/watchingUsers/${memberId}`, {
                method: "DELETE"
            });
        },
        onSuccess: () => refetch()
    });

    if (!taskData) return null;

    return (
        <div style={{ width: "100%", textAlign: "center", marginBottom: "10px" }}>
            <strong style={{ fontSize: "22px" }}>Watchers:</strong>

            <div style={{ marginTop: "6px" }}>

                {teamMembers.map((member) => {

                    let isWatching = false;
                    for (let i = 0; i < taskData.watchers.length; i++) {
                        const watcher = taskData.watchers[i];
                        if (watcher.id === member.id) {
                            isWatching = true;
                        }
                    }

                    return (
                        <span
                            key={member.id}
                            style={{
                                margin: "6px",
                                cursor: "pointer",
                                color: isWatching ? "lightgreen" : "white",
                                textDecoration: isWatching ? "underline" : "none",
                                fontSize: "16px"
                            }}
                            onClick={() =>
                                isWatching ? removeWatcher.mutate(member.id) : addWatcher.mutate(member.id)
                            }
                        >
                            {member.email}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};