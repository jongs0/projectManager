package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.project.ProjectUpdateDTO;
import Dreamteam.GroupProject1.dto.team.TeamCreateDTO;
import Dreamteam.GroupProject1.dto.team.TeamDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import Dreamteam.GroupProject1.service.ProjectService;
import Dreamteam.GroupProject1.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/myProjects")
public class ProjectController {
    final private ProjectService projectService;
    final private AppUserService appUserService;;
    final private TeamService teamService;

    @Autowired
    public ProjectController(ProjectService projectService, AppUserService appUserService, TeamService teamService) {
        this.projectService = projectService;
        this.appUserService = appUserService;
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectCreateDTO createDTO, @RequestParam String teamName, @RequestParam Long userId) {
        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can create projects");
        ProjectDTO created = projectService.createProject(createDTO, appUser);

        TeamCreateDTO teamDto = new TeamCreateDTO(created.id(), teamName);
        TeamDTO createdTeam = teamService.createTeam(teamDto);
        teamService.addMember(createdTeam.id(), appUser.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long projectId, @RequestParam Long userId, @RequestBody ProjectUpdateDTO updateDto) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can update projects");

        ProjectDTO updatedProject = projectService.updateProject(projectId, updateDto);
        return ResponseEntity.ok(updatedProject);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getMyProjects(@RequestParam Long userId) {
        List<ProjectDTO> myProjects = projectService.getMyProjects(userId);
        return ResponseEntity.ok(myProjects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        ProjectDTO project = projectService.findById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectService.findAll();
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> deleteProject(@PathVariable Long projectId, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can delete projects");

        ProjectDTO deleted = projectService.deleteProject(projectId, userId);
        return ResponseEntity.ok(deleted);
    }
}
