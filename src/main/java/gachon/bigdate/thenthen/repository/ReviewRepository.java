package gachon.bigdate.thenthen.repository;

import gachon.bigdate.thenthen.entity.Review;
import gachon.bigdate.thenthen.entity.ReviewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, ReviewId> {
    List<Review> findByReviewIdCourseCourseId(long courseId);
    @Transactional
    int deleteAllByReviewIdCourseCourseId(Long courseId);
    Review findByReviewId(ReviewId reviewId);
}
