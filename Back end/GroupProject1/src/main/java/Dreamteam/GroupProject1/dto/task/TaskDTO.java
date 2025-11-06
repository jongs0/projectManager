package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.dto.comment.CommentSummaryDTO;
import Dreamteam.GroupProject1.models.Task;

import java.util.List;

public record TaskDTO(

        Long id,
        String name,
        String body,
        List<CommentSummaryDTO> comments,
        List<AppUserSummaryDTO> watchers

) {
    public static TaskDTO fromEntity(Task task) {

        List<CommentSummaryDTO> commentDtos = task.getComments()
                .stream()
                .map(CommentSummaryDTO::fromEntity)
                .toList();

        List<AppUserSummaryDTO> watcherDtos = task.getWatchingUsers()
                .stream()
                .map(AppUserSummaryDTO::fromEntity)
                .toList();

        return new TaskDTO(
                task.getId(),
                task.getName(),
                task.getDescription(),
                commentDtos,
                watcherDtos
        );
    }
}
