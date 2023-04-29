package gachon.bigdate.thenthen.Repository;

import gachon.bigdate.thenthen.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByReviewIdCourseId(long courseId);
}
