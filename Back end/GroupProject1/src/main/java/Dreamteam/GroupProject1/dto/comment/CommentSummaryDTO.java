package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.models.Comment;

public record CommentSummaryDTO(
        Long id,
        String body,
        AppUserSummaryDTO appUserDto

) {

    public static CommentSummaryDTO fromEntity(Comment comment) {

        AppUserSummaryDTO appUserDto = AppUserSummaryDTO.fromEntity(comment.getUser());

        return new CommentSummaryDTO(
                comment.getId(),
                comment.getBody(),
                appUserDto
        );
    }
}
