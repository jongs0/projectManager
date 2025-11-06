package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.validation.constraints.Size;

public record AdminAppUserUpdateDTO(

        String email,

        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String password,
        Role role
) {
    public void updateAppUser(AppUser appUser) {

        if (email != null) {
            appUser.setEmail(email);
        }
        if (password != null) {
            appUser.setPassword(password);
        }
        if (role != null) {
                appUser.setRole(role);
        }
    }
}


