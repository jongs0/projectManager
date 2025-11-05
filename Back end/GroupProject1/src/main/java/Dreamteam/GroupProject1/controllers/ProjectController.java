package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
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

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

//    @PostConstruct
//    public void createDummyData() {
//        projectService.createProject(new ProjectCreateDTO("Project A", 30));
//        projectService.createProject(new ProjectCreateDTO("Project B", 30));
//        projectService.createProject(new ProjectCreateDTO("Project C", 30));
//        projectService.createProject(new ProjectCreateDTO("Project D", 30));
//    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody ProjectCreateDTO createDto) {
        ProjectDTO created = projectService.createProject(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ProjectDTO> updateProject(
//            @PathVariable Long id,
//            @Valid @RequestBody ProjectUpdateDTO updateDto) {
//        ProjectDTO updated = projectService.updateProject(id, updateDto);
//        return ResponseEntity.ok(updated);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        ProjectDTO project = projectService.findById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projectDTOs = projectService.findAll();
        return ResponseEntity.ok(projectDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProjectDTO> deleteProject(@PathVariable Long id) {
        ProjectDTO project = projectService.findById(id);
        projectService.deleteProject(id);
        return ResponseEntity.ok(project);
    }
}
