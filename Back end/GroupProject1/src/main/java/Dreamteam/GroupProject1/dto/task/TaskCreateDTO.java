package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.models.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskCreateDTO(

        Long projectId,

        @NotBlank(message = "Tasks must have a name.")
        @Size(max = 255)
        String name,

        @Size(max = 2200)
        String description

) {
    public Task toEntity() {

        Task task = new Task();
        task.setName(this.name);
        task.setDescription(this.description);
        return task;
    }
}

