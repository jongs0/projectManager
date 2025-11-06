package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.models.Task;

import java.util.List;

public record TaskSummaryDTO(
        Long id,
        String name,
        String body,
        List<AppUserSummaryDTO> watchers,
        boolean done
) {

    public static TaskSummaryDTO fromEntity(Task task) {

        List<AppUserSummaryDTO> watcherDtos = task.getWatchingUsers() == null
                ? List.of()
                : task.getWatchingUsers().stream()
                .map(AppUserSummaryDTO::fromEntity)
                .toList();

        return new TaskSummaryDTO(
                task.getId(),
                task.getName(),
                task.getDescription(),
                watcherDtos,
                task.isDone()

        );
    }
}
