package Dreamteam.GroupTask1.controllers;

import Dreamteam.GroupProject1.controllers.CommentController;
import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.task.*;
import Dreamteam.GroupProject1.dto.task.TaskCreateDTO;
import Dreamteam.GroupProject1.dto.task.TaskDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import Dreamteam.GroupProject1.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("tasks")
public class TaskController {
    final private TaskService taskService;
    final private AppUserService userService;

    @Autowired
    public TaskController(TaskService taskService, AppUserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }


//    @PostConstruct
//    public void createDummyData() {
//        taskService.createTask(new TaskCreateDTO("Task A", 30));
//        taskService.createTask(new TaskCreateDTO("Task B", 30));
//        taskService.createTask(new TaskCreateDTO("Task C", 30));
//        taskService.createTask(new TaskCreateDTO("Task D", 30));
//    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskCreateDTO createDto, @RequestParam Long userId) {

        AppUser appUser = userService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can create tasks.");

        TaskDTO created = taskService.createTask(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        TaskDTO task = taskService.findById(id);
        return ResponseEntity.ok(task);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskUpdateDTO updateDto,
            @RequestParam Long userId) {

        AppUser appUser = userService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can update tasks.");

        TaskDTO updated = taskService.updateTask(id, updateDto);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{taskId}/watchingUsers/{userId}")
    public ResponseEntity<TaskDTO> addWatchingUser(
            @PathVariable Long taskId,
            @PathVariable Long userId) {

        AppUser appUser = userService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can add watching users.");

        TaskDTO updated = taskService.addWatchingUser(taskId, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{taskId}/watchingUsers/{userId}")
    public ResponseEntity<TaskDTO> removeWatchingUser(
            @PathVariable Long taskId,
            @PathVariable Long userId) {

        AppUser appUser = userService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can remove watching users.");

        TaskDTO updated = taskService.removeWatchingUser(taskId, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDTO> deleteTask(@PathVariable Long id,
                                              @RequestParam Long userId) {

        AppUser appUser = userService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can delete tasks.");

        TaskDTO task = taskService.findById(id);
        taskService.deleteTask(id);
        return ResponseEntity.ok(task);
    }
}
