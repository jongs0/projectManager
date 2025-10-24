package Dreamteam.GroupProject1.repository;

import Dreamteam.GroupProject1.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Long> {
}
