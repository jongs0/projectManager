package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.models.Comment;
import jakarta.validation.constraints.Size;

public record CommentUpdateDTO(
        @Size(max = 2200)
        String body
) {
    public void updateComment(Comment comment) {
        if (body != null) comment.setBody(body);
    }
}




