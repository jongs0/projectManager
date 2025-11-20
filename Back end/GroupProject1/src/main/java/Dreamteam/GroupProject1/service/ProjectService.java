package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.appuser.AppUserSummaryDTO;
import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.project.ProjectUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Team;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import Dreamteam.GroupProject1.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ProjectDTO createProject(ProjectCreateDTO createDTO, AppUser owner) {
        Project project = createDTO.toEntity();
        project.setOwner(owner);
        Project savedProject = projectRepository.save(project);
        return ProjectDTO.fromEntity(savedProject);
    }

    public ProjectDTO findById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));
        return ProjectDTO.fromEntity(project);
    }

    public List<ProjectDTO> getMyProjects(Long userId) {
        return projectRepository.findAllByUserId(userId)
                .stream()
                .map(ProjectDTO::fromEntity)
                .toList();
    }

    public List<ProjectDTO> findAll() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectDTO::fromEntity)
                .toList();
    }

    public ProjectDTO updateProject(Long id, ProjectUpdateDTO updateDTO) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));

        updateDTO.updateProject(project);
        Project savedProject = projectRepository.save(project);
        return ProjectDTO.fromEntity(savedProject);
    }

    @Transactional
    public ProjectDTO deleteProject(Long id, Long userId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));

        if (project.getOwner() == null || !project.getOwner().getId().equals(userId)) {
            throw new UnauthorizedException("You can only delete projects that you own");
        }

        for (Team team : project.getTeams()) {
            for (AppUser member : team.getTeamMembers()) {
                member.getTeams().remove(team);
            }
            team.getTeamMembers().clear();
        }

        project.getTeams().clear();
        project.getTasks().clear();

        projectRepository.delete(project);

        return ProjectDTO.fromEntity(project);
    }
}
