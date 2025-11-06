package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.models.Comment;
import jakarta.validation.constraints.Max;

public record CommentUpdateDTO(
        Long id,
        @Max(2200)
        String body
) {
    public void updateComment(Comment comment) {
        comment.setBody(this.body);
    }
}




