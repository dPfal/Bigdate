package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.CommentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, CommentId> {
    int countByCommentIdCourseId(long courseId);
}
