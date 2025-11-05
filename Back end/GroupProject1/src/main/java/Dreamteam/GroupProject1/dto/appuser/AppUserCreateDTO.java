package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AppUserCreateDTO(

        @NotBlank(message = "Email is required.")
        @Email String email,

        @NotBlank(message = "Password is required.")
        String password

) {
    public AppUser toEntity() {
        AppUser appUser = new AppUser();
        appUser.setEmail(this.email);
        appUser.setPassword(this.password);
        return appUser;
    }
}
