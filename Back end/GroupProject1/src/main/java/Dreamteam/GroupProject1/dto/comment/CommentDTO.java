package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Comment;

public record CommentDTO(
        Long id,
        String body,
        AppUserSummaryDTO appUser
) {
    public static CommentDTO fromEntity(Comment comment) {

        AppUserSummaryDTO appUserDto = AppUserSummaryDTO.fromEntity(comment.getUser());


        return new CommentDTO(
        comment.getId(),
        comment.getBody(),
        appUserDto
        );
    }
}
