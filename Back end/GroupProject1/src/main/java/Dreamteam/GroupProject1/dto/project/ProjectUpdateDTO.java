package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.models.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProjectUpdateDTO(

        @NotBlank(message = "Project name cannot be blank.")
        @Size(max = 255)
        String name,

        @Size(max = 2200, message = "Description must be at most 2200 characters.")
        String description

) {


    public void updateProject(Project project) {
        if (name != null && !name.isBlank()) {
            project.setName(name);
        }
        if (description != null) {
            project.setDescription(description);
        }
    }
}
