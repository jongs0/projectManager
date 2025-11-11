package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.project.ProjectUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import Dreamteam.GroupProject1.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public ProjectDTO createProject(ProjectCreateDTO createDTO) {
        Project project = createDTO.toEntity();
        Project savedProject = projectRepository.save(project);
        return ProjectDTO.fromEntity(savedProject);
    }

    public ProjectDTO findById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));
        return ProjectDTO.fromEntity(project);
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

    public ProjectDTO deleteProject (Long id) {
        Project projectToBeDeleted = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + id));

        projectRepository.delete(projectToBeDeleted);
        return ProjectDTO.fromEntity(projectToBeDeleted);
    }
}
