package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.dto.task.TaskSummaryDTO;
import Dreamteam.GroupProject1.dto.team.TeamSummaryDTO;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Task;
import Dreamteam.GroupProject1.models.Team;

import java.util.List;

public record ProjectDTO(
        Long id,
        String name,
        String description,
        List<TaskSummaryDTO> tasks,
        List<TeamSummaryDTO> teams
) {

    public static ProjectDTO fromEntity(Project project) {

        List<TaskSummaryDTO> taskDtos = project.getTasks() == null ? List.of()
                : project.getTasks()
                .stream()
                .map(TaskSummaryDTO::fromEntity)
                .toList();

        List<TeamSummaryDTO> teamDtos = project.getTeams() == null ? List.of()
                : project.getTeams()
                .stream()
                .map(TeamSummaryDTO::fromEntity)
                .toList();

        return new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getDescription(),
                taskDtos,
                teamDtos
        );
    }
}
