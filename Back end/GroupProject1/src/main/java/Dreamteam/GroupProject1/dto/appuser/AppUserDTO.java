package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.dto.comment.CommentSummaryDTO;
import Dreamteam.GroupProject1.dto.task.TaskSummaryDTO;
import Dreamteam.GroupProject1.dto.team.TeamSummaryDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;

import java.util.List;

public record AppUserDTO(
        Long id,
        String email,
        Role role,
        List<TeamSummaryDTO> teamDto,
        List<TaskSummaryDTO> taskDto,
        List<CommentSummaryDTO> commentDto
) {
    public static AppUserDTO fromEntity(AppUser appUser) {

        List<TeamSummaryDTO> teamDtos = appUser.getTeams()
                .stream()
                .map(TeamSummaryDTO::fromEntity)
                .toList();

        List<TaskSummaryDTO> taskDtos = appUser.getWatchedTasks()
                .stream()
                .map(TaskSummaryDTO::fromEntity)
                .toList();

        List<CommentSummaryDTO> commentDtos = appUser.getComments()
                .stream()
                .map(CommentSummaryDTO::fromEntity)
                .toList();

        return new AppUserDTO(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getRole(),
                teamDtos,
                taskDtos,
                commentDtos
        );
    }


}
