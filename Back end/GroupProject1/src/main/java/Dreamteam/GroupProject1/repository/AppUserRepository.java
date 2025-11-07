package Dreamteam.GroupProject1.repository;

import Dreamteam.GroupProject1.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findByEmail(String email);
    boolean existsByEmail(String email);
}