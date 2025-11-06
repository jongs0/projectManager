package Dreamteam.GroupProject1.dto.team;

import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.dto.project.ProjectSummaryDTO;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Team;

import java.util.List;

public record TeamDTO(
        Long id,
        String name,
        ProjectSummaryDTO project,
        List<AppUserSummaryDTO> teamMembers

) { public static TeamDTO fromEntity(Team team) {

    List<AppUserSummaryDTO> memberDtos = team.getTeamMembers()
            .stream()
            .map(AppUserSummaryDTO::fromEntity)
            .toList();

    return new TeamDTO(
            team.getId(),
            team.getName(),
            ProjectSummaryDTO.fromEntity(team.getProject()),
            memberDtos
    );
}
}
