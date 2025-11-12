package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.dto.comment.CommentDTO;
import Dreamteam.GroupProject1.dto.team.TeamCreateDTO;
import Dreamteam.GroupProject1.dto.team.TeamDTO;
import Dreamteam.GroupProject1.models.Comment;
import Dreamteam.GroupProject1.models.Team;
import Dreamteam.GroupProject1.repository.ProjectRepository;
import Dreamteam.GroupProject1.repository.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, ProjectRepository projectRepository) {
        this.teamRepository = teamRepository;
        this.projectRepository = projectRepository;
    }


    public TeamDTO createTeam(TeamCreateDTO createDTO) {
        Team team = createDTO.toEntity();
        Long projectId = createDTO.projectId();
        team.setProject(projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + projectId)));
        team.setName(createDTO.name());
        Team savedTeam = teamRepository.save(team);
        return TeamDTO.fromEntity(savedTeam);
    }




}
