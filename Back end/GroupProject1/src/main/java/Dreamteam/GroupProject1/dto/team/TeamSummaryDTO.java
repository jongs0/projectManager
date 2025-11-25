package Dreamteam.GroupProject1.dto.team;

import Dreamteam.GroupProject1.models.Team;

public record TeamSummaryDTO(
        Long id,
        String name,
        Long projectId
) {
    public static TeamSummaryDTO fromEntity(Team team) {
        return new TeamSummaryDTO(
                team.getId(),
                team.getName(),
                team.getProject().getId()
        );
    }
}