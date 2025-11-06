package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.dto.task.TaskSummaryDTO;
import Dreamteam.GroupProject1.models.Comment;

public record CommentDTO(
        Long id,
        String body,
        AppUserSummaryDTO appUser,
        TaskSummaryDTO task
) {
    public static CommentDTO fromEntity(Comment comment) {

        AppUserSummaryDTO appUserDto = AppUserSummaryDTO.fromEntity(comment.getUser());


        return new CommentDTO(
                comment.getId(),
                comment.getBody(),
                AppUserSummaryDTO.fromEntity(comment.getUser()),
                TaskSummaryDTO.fromEntity(comment.getTask())
        );
    }
}
