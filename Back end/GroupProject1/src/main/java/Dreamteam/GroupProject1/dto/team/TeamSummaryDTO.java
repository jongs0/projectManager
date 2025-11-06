package Dreamteam.GroupProject1.dto.team;

import Dreamteam.GroupProject1.models.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TeamSummaryDTO(

        @NotBlank(message = "Team name is required.")
        @Size(max = 255)
        String name
) {
    public void updateTeam(Team team) {
        if (name != null) {
            team.setName(name);
        }
    }
}
