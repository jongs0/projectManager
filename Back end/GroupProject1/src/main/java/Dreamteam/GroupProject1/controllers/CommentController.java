package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.comment.CommentCreateDTO;
import Dreamteam.GroupProject1.dto.comment.CommentDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
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
    final private AppUserService appUserService;


    @Autowired
    public CommentController(CommentService commentService, AppUserService appUserService)
    {
        this.commentService = commentService;
        this.appUserService = appUserService;

    }


    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentCreateDTO createDTO, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can create comments.");

        CommentDTO created = commentService.createComment(createDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can delete comments.");

        commentService.deleteComment(id);
        return ResponseEntity.ok("Comment with ID " + id + " deleted");
    }

}
