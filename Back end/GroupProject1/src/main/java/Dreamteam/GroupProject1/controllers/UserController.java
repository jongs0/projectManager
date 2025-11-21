package Dreamteam.GroupProject1.controllers;
import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;
import Dreamteam.GroupProject1.dto.appuser.AppUserCreateDTO;
import Dreamteam.GroupProject1.dto.appuser.AppUserDTO;
import Dreamteam.GroupProject1.dto.appuser.AppUserLoginDTO;
import Dreamteam.GroupProject1.dto.task.TaskDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("users")
public class UserController {
    final private AppUserService userService;

    @Autowired
    public UserController(AppUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUserDTO> getUser(@PathVariable Long id) {
        AppUserDTO user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {
        List<AppUserDTO> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    public ResponseEntity<AppUserDTO> createUser(@Valid @RequestBody AppUserCreateDTO createDto) {

        AppUserDTO created = userService.createAppUser(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("login")
    public ResponseEntity<Optional<AppUserDTO>> logUserIn(@Valid @RequestBody AppUserLoginDTO appUserLoginDTO) {

        try {
            AppUserDTO loggedInUser = userService.logUserIn(appUserLoginDTO);
            return ResponseEntity.status(HttpStatus.OK).body(Optional.of(loggedInUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Optional.empty());
        }
    }

    @PatchMapping("/{id}/role/{role}")
    public ResponseEntity<AppUserDTO> changeRole(@PathVariable Long id, @PathVariable Role role, @RequestParam Long senderId) {

        AppUser sender = userService.getUserById(senderId);
        if (sender.hasRole(Role.CLIENT))
            throw new UnauthorizedException("Only Project Managers and Developers can update roles.");

        AppUserDTO updatedUser = userService.changeRole(id, role);
        return ResponseEntity.ok(updatedUser);
    }
}
