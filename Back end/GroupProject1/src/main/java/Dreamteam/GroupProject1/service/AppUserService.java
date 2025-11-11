package Dreamteam.GroupProject1.service;

import Dreamteam.GroupProject1.dto.appuser.AppUserCreateDTO;
import Dreamteam.GroupProject1.dto.appuser.AppUserDTO;
import Dreamteam.GroupProject1.dto.project.ProjectDTO;
import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import Dreamteam.GroupProject1.repository.AppUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AppUserDTO createAppUser(AppUserCreateDTO createDTO) {

        AppUser appUser = createDTO.toEntity();

        if (!appUserRepository.existsByEmail(appUser.getEmail())) {
            AppUser savedAppUser = appUserRepository.save(appUser);
            return AppUserDTO.fromEntity(savedAppUser);
        } else {
            throw new IllegalArgumentException("Email already taken");
        }
    }

    public AppUserDTO findById(Long id) {
        AppUser appUser = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
        return AppUserDTO.fromEntity(appUser);
    }

}


