package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.dto.comment.CommentCreateDTO;
import Dreamteam.GroupProject1.dto.comment.CommentDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Comment;
import Dreamteam.GroupProject1.models.Task;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import Dreamteam.GroupProject1.repository.CommentRepository;
import Dreamteam.GroupProject1.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final AppUserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, TaskRepository taskRepository, AppUserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public CommentDTO createComment(CommentCreateDTO createDTO) {
        Comment comment = createDTO.toEntity();

        Long userId = createDTO.userId();
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("There's no user with ID " + userId));
        comment.setUser(user);
        user.getComments().add(comment);

        Long taskId = createDTO.taskId();
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("There's no post with ID " + taskId));
        comment.setTask(task);
        task.getComments().add(comment);

        Comment savedComment = commentRepository.save(comment);
        return CommentDTO.fromEntity(savedComment);
    }

    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No comment found with id " + id));

        AppUser user = comment.getUser();
        if (user != null) {
            user.getComments().remove(comment);
        }

        Task post = comment.getTask();
        if (post != null) {
            post.getComments().remove(comment);
        }
        commentRepository.delete(comment);
    }
}
