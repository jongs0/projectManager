package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.enums.Role;

public record AppUserSummaryDTO(

        Long id,
        String email,
        Role role

) {
    public static AppUserSummaryDTO fromEntity(AppUser appUser) {
        return new AppUserSummaryDTO(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getRole()
        );
    }
}