package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.comment.CommentCreateDTO;
import Dreamteam.GroupProject1.dto.comment.CommentDTO;
import Dreamteam.GroupProject1.dto.comment.CommentUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import Dreamteam.GroupProject1.service.CommentService;
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

    @PutMapping("/{commentId}/edit")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long commentId, @RequestParam Long userId, @RequestBody CommentUpdateDTO updateDto) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!(appUser.hasRole(Role.PROJECTMANAGER) || appUser.hasRole(Role.DEVELOPER)))
            throw new UnauthorizedException("Only Project Managers and Developers can update comments.");

        CommentDTO updatedComment = commentService.updateComment(commentId, userId, updateDto);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteComment(@PathVariable Long id, @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (appUser.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can delete comments.");

        commentService.deleteComment(id);
        return ResponseEntity.ok("Comment with ID " + id + " deleted");
    }

}
