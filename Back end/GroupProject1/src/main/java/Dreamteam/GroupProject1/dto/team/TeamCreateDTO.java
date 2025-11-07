package Dreamteam.GroupProject1.dto.team;

import Dreamteam.GroupProject1.models.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TeamCreateDTO(

        @NotNull(message = "A team must be linked to a project")
        Long projectId,

        @NotBlank(message = "Teams must have a name")
        String name

) {

    public Team toEntity() {
        Team team = new Team();
        team.setName(this.name);
        return team;
    }
}
