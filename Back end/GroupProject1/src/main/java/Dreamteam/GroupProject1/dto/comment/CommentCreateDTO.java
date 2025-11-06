package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Comment;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;

public record CommentCreateDTO(

        Long commentId,
        Long appUserId,
        Long taskId,
        @Max(2200)
        String body
) {

    public Comment toEntity() {
        Comment comment = new Comment();
        comment.setBody(this.body);
        return comment;
    }
}

