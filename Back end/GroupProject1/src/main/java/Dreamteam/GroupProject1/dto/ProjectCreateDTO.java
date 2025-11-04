package Dreamteam.GroupProject1.dto;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;

public record ProjectCreateDTO(
        @NotBlank(message = "Project name is required")
        @Email
        String name
) {
    public Project toEntity() {

        return new Project(
                null,
                name,
                new ArrayList<>()
                );
    }
}
