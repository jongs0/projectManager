package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.models.Task;

import java.util.List;

public record TaskSummaryDTO(
        Long id,
        String name,
        String body,
        List<AppUserSummaryDTO> watchers
) {

    public static TaskSummaryDTO fromEntity(Task task) {

        List<AppUserSummaryDTO> watcherDtos = task.getUsers() == null
                ? List.of()
                : task.getUsers().stream()
                .map(AppUserSummaryDTO::fromEntity)
                .toList();

        return new TaskSummaryDTO(
                task.getId(),
                task.getName(),
                task.getBody(),
                watcherDtos

        );
    }
}
