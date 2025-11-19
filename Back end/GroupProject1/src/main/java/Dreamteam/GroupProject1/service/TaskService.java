package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.dto.project.ProjectCreateDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.dto.task.TaskCreateDTO;
import Dreamteam.GroupProject1.dto.task.TaskDTO;
import Dreamteam.GroupProject1.dto.task.TaskUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.models.Task;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import Dreamteam.GroupProject1.repository.ProjectRepository;
import Dreamteam.GroupProject1.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import java.util.List;

@Service
public class TaskService {

    TaskRepository taskRepository;
    ProjectRepository projectRepository;
    AppUserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, AppUserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public TaskDTO createTask(TaskCreateDTO createDTO) {
        Task task = createDTO.toEntity();
        Project project = projectRepository.findById(createDTO.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found with ID: " + createDTO.projectId()));

        task.setProject(project);
        Task savedTask = taskRepository.save(task);

        return TaskDTO.fromEntity(savedTask);
    }

    public TaskDTO findById(Long id) {
        Task Task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with ID: " + id));
        return TaskDTO.fromEntity(Task);
    }

    public List<TaskDTO> findAll() {
        return taskRepository.findAll()
                .stream()
                .map(TaskDTO::fromEntity)
                .toList();
    }

    public TaskDTO updateTask(Long id, TaskUpdateDTO updateDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with ID: " + id));

        updateDTO.updateTask(task);
        Task savedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(savedTask);
    }

    public TaskDTO addWatchingUser(Long taskId, Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with ID: " + taskId));

        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        task.addWatchingUser(user);
        Task savedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(savedTask);
    }

    public TaskDTO removeWatchingUser(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with ID: " + taskId));

        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        task.removeWatchingUser(user);
        Task savedTask = taskRepository.save(task);
        return TaskDTO.fromEntity(savedTask);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
