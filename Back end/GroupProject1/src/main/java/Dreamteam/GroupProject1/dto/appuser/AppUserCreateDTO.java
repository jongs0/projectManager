package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.PathVariable;

public record AppUserCreateDTO(

        @Column(unique=true)
        @NotBlank(message = "Email is required.")
        @Email String email,

        @NotBlank(message = "Password is required.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        String password,

        @Enumerated(EnumType.STRING)
        Role role

) {
    public AppUser toEntity() {
        AppUser appUser = new AppUser();
        appUser.setEmail(this.email);
        appUser.setPassword(this.password);
        appUser.setRole(this.role);
        return appUser;
    }
}
