package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Team;
import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.validation.constraints.Email;

import java.util.List;

public record AppUserUpdateDTO(

        @Email
        String email,
        String password,
        Role role
) {
    public void updateAppUser (AppUser appUser){

        appUser.setEmail(this.email);
        appUser.setPassword(this.password);
        appUser.setRole(this.role);
    }
}
