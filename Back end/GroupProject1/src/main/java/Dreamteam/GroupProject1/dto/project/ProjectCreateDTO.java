package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.models.Project;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;

public record ProjectCreateDTO(
        @NotBlank(message = "Project name is required")
        String name
) {
    public Project toEntity() {

        return new Project(
                null,
                name,
                new ArrayList<>(),
                new ArrayList<>()
                );
    }
}
