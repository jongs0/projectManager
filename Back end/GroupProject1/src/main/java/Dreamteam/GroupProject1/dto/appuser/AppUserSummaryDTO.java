package Dreamteam.GroupProject1.dto.appuser;

import Dreamteam.GroupProject1.models.AppUser;

public record AppUserSummaryDTO(

        Long id,
        String email

) {
    public static AppUserSummaryDTO fromEntity(AppUser appUser) {
        return new AppUserSummaryDTO(
                appUser.getId(),
                appUser.getEmail()
        );
    }
}