package Dreamteam.GroupProject1.dto.comment;

import Dreamteam.GroupProject1.models.Comment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentCreateDTO(

        @NotNull(message = "Task id is required.")
        Long taskId,

        @NotBlank(message = "Body is required")
        @Size(max = 2200)
        String body
) {

    public Comment toEntity() {
        Comment comment = new Comment();
        comment.setBody(this.body);
        return comment;
    }
}

