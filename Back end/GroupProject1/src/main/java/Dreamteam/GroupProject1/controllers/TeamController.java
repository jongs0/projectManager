package Dreamteam.GroupProject1.controllers;

import Dreamteam.GroupProject1.controllers.Exceptions.UnauthorizedException;

import Dreamteam.GroupProject1.dto.task.TaskDTO;
import Dreamteam.GroupProject1.dto.team.TeamCreateDTO;
import Dreamteam.GroupProject1.dto.team.TeamDTO;
import Dreamteam.GroupProject1.dto.team.TeamUpdateDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import Dreamteam.GroupProject1.service.AppUserService;
import Dreamteam.GroupProject1.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/teams")

public class TeamController {

    final private TeamService teamService;
    final private AppUserService appUserService;

    @Autowired
    public TeamController(TeamService teamService, AppUserService appUserService) {
        this.teamService = teamService;
        this.appUserService = appUserService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDTO> getTeam(@PathVariable Long id) {
        TeamDTO team = teamService.findById(id);
        return ResponseEntity.ok(team);
    }

    @PostMapping
    public ResponseEntity<TeamDTO> createTeam(@Valid @RequestBody TeamCreateDTO createDTO,
                                              @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can create teams.");

        TeamDTO created = teamService.createTeam(createDTO);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/{teamId}/add/{userId}")
    public ResponseEntity<TeamDTO> addTeamMember(@PathVariable Long teamId,
                                                 @PathVariable Long userId,
                                                 @RequestParam Long pmId) {

        AppUser pm = appUserService.getUserById(pmId);

        if (!pm.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can add team members.");

        TeamDTO updated = teamService.addMember(teamId, userId);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable Long teamId,
                                              @RequestParam Long userId,
                                              @RequestBody TeamUpdateDTO updateDTO) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can update teams.");

        TeamDTO updated = teamService.updateTeam(teamId, updateDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{teamId}/delete/{userId}")
    public ResponseEntity<TeamDTO> removeTeamMember(@PathVariable Long teamId,
                                                    @PathVariable Long userId,
                                                    @RequestParam Long pmId) {

        AppUser pm = appUserService.getUserById(pmId);

        if (!pm.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException("Only Project Managers can remove team members.");

        TeamDTO updated = teamService.removeMember(teamId, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeamDTO> deleteTeam(@PathVariable Long id,
                                              @RequestParam Long userId) {

        AppUser appUser = appUserService.getUserById(userId);

        if (!appUser.hasRole(Role.PROJECTMANAGER))
            throw new UnauthorizedException(("Only Project Managers can delete teams."));

        TeamDTO team = teamService.findById(id);
        teamService.deleteTeam(id);
        return ResponseEntity.ok(team);
    }
}