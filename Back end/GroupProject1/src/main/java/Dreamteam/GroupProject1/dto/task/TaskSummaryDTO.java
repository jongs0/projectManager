package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.models.Task;

public record TaskSummaryDTO(
        Long id,
        String name,
        String body
) {

    public static TaskSummaryDTO fromEntity(Task task) {

        return new TaskSummaryDTO(
                task.getId(),
                task.getName(),
                task.getBody()
        );
    }
}
