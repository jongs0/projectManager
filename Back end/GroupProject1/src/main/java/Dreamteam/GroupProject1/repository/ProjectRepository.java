package Dreamteam.GroupProject1.repository;

import Dreamteam.GroupProject1.models.AppUser;
import Dreamteam.GroupProject1.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("""
    SELECT p
    FROM project p
    JOIN p.team t
    JOIN t.members m
    WHERE m.id = :userId
""")
    List<Project> findAllByUserId(Long userId);
}
