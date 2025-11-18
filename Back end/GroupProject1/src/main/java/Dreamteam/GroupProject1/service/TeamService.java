package Dreamteam.GroupProject1.service;


import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.team.TeamCreateDTO;
import Dreamteam.GroupProject1.dto.team.TeamDTO;
import Dreamteam.GroupProject1.dto.team.TeamUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Team;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import Dreamteam.GroupProject1.repository.ProjectRepository;
import Dreamteam.GroupProject1.repository.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final ProjectRepository projectRepository;
    private final AppUserRepository appUserRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, ProjectRepository projectRepository, AppUserRepository appUserRepository) {
        this.teamRepository = teamRepository;
        this.projectRepository = projectRepository;
        this.appUserRepository = appUserRepository;
    }

    public TeamDTO createTeam(TeamCreateDTO createDTO) {
        Project project = projectRepository.findById(createDTO.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + createDTO.projectId()));

        Team team = createDTO.toEntity(project);
        Team savedTeam = teamRepository.save(team);

        return TeamDTO.fromEntity(savedTeam);
    }

    public TeamDTO findById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + id));
        return TeamDTO.fromEntity(team);
    }

    public TeamDTO updateTeam(Long id, TeamUpdateDTO updateDTO) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + id));

        updateDTO.updateTeam(team);
        Team savedTeam = teamRepository.save(team);
        return TeamDTO.fromEntity(savedTeam);
    }

    public TeamDTO addMember(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + teamId));

        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        team.addTeamMember(appUser);
        appUser.addTeam(team);
        appUserRepository.save(appUser);
        teamRepository.save(team);
        return TeamDTO.fromEntity(team);
    }

    public TeamDTO removeMember(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + teamId));

        AppUser appUser = appUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        team.removeTeamMember(appUser);
        Team savedTeam = teamRepository.save(team);
        return TeamDTO.fromEntity(savedTeam);
    }

    public TeamDTO deleteTeam (Long id) {
        Team teamToBeDeleted = teamRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with ID: " + id));

        teamRepository.delete(teamToBeDeleted);
        return TeamDTO.fromEntity(teamToBeDeleted);
    }
}