package Dreamteam.GroupProject1.dto;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Task;
import Dreamteam.GroupProject1.models.enums.Role;

import java.util.List;

public record ProjectDTO(
        Long id,
        String name,
        List<Task> tasks
) {
    
    public static ProjectDTO fromEntity(Project project) {

        return new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getTasks()
        );
    }
}
