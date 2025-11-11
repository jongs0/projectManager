package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.dto.comment.CommentCreateDTO;
import Dreamteam.GroupProject1.dto.comment.CommentDTO;
import Dreamteam.GroupProject1.service.CommentService;
import Dreamteam.GroupProject1.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/comments")
public class CommentController {

    final private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService)
    {
        this.commentService = commentService;
    }


    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentCreateDTO createDTO) {
        CommentDTO created = commentService.createComment(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok("Comment with ID " + id + " deleted");
    }

}
