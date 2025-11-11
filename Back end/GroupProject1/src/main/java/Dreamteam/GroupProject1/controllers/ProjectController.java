package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.project.ProjectUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import Dreamteam.GroupProject1.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/projects")
public class ProjectController {
    final private ProjectService projectService;
    final private AppUserService appUserService;

    @Autowired
    public ProjectController(ProjectService projectService, AppUserService appUserService) {
        this.projectService = projectService;
        this.appUserService = appUserService;
    }


    @PostMapping

    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectCreateDTO createDto, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can create projects");

        ProjectDTO created = projectService.createProject(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long projectId, @RequestParam Long userId, @RequestBody ProjectUpdateDTO updateDto) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can update projects");

        ProjectDTO updatedProject = projectService.updateProject(projectId, updateDto);
        return ResponseEntity.ok(updatedProject);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        ProjectDTO project = projectService.findById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectService.findAll();
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<ProjectDTO> deleteProject(@PathVariable Long projectId, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can create projects");

        ProjectDTO project = projectService.findById(projectId);
        projectService.deleteProject(projectId);
        return ResponseEntity.ok(project);
    }
}
