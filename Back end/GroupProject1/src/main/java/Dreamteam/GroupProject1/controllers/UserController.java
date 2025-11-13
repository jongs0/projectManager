package Dreamteam.GroupProject1.controllers;
import Dreamteam.GroupProject1.dto.appuser.AppUserCreateDTO;
import Dreamteam.GroupProject1.dto.appuser.AppUserDTO;
import Dreamteam.GroupProject1.dto.appuser.AppUserLoginDTO;
import Dreamteam.GroupProject1.dto.task.TaskDTO;
import Dreamteam.GroupProject1.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<AppUserDTO> createUser(@Valid @RequestBody AppUserCreateDTO createDto) {

        AppUserDTO created = userService.createAppUser(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("login")
    public ResponseEntity<AppUserDTO> logUserIn(AppUserLoginDTO appUserLoginDTO) {

        AppUserDTO loggedInUser = userService.logUserIn(appUserLoginDTO);
        return ResponseEntity.status(HttpStatus.OK).body(loggedInUser);
    }
}
