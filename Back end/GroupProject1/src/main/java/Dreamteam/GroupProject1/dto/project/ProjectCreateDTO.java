package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.models.Project;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProjectCreateDTO(
        @NotBlank(message = "Project name is required")
        String name,
        @Size(max = 2200)
        String description
) {

    public Project toEntity() {
        Project project = new Project();
        project.setName(this.name);
        project.setDescription(this.description);
        return project;
    }
}
