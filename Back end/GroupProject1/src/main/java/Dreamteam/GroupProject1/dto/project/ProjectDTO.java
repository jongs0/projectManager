package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Task;
import Dreamteam.GroupProject1.models.Team;

import java.util.List;

public record ProjectDTO(
        Long id,
        String name,
        List<Task> tasks,
        List<Team> teams
) {
    
    public static ProjectDTO fromEntity(Project project) {

        return new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getTasks(),
                project.getTeams()
        );
    }
}
