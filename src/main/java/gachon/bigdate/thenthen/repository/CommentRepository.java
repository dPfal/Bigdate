package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.CommentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface CommentRepository extends JpaRepository<Comment, CommentId> {
    int countByCommentIdCourseId(long courseId);
    int countByCommentIdCommentDateBetween(LocalDateTime startDateTime,LocalDateTime endDateTime);
    Comment findByCommentId(CommentId commentId);
}
