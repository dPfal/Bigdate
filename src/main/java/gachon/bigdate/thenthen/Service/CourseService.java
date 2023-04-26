package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.Repository.CourseRepository;
import gachon.bigdate.thenthen.Repository.ReviewRepository;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Review;
import gachon.bigdate.thenthen.entity.ReviewId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public CourseDTO createCourse(CourseDTO courseDTO){
        Course createdCourse = this.courseRepository.save(Course.builder()
                        .id(courseDTO.getId())
                .courseInfo(courseDTO.getCourseInfo())
                .courseName(courseDTO.getCourseTitle())
                .build());

        Long courseId = createdCourse.getCourseId();
        System.out.println(courseId);
        ArrayList<Review> reviewArrayList = new ArrayList<>();

        for (ReviewDTO reviewDTO : courseDTO.getReviewList()) {
            ReviewId reviewId = new ReviewId();
            reviewId.setPlaceId(reviewDTO.getPlaceId());
            reviewId.setPlaceSequence(reviewDTO.getPlaceSequence());
            reviewId.setCourseId(courseId);

            Review review = Review.builder()
                    .isDel(0)
                    .reviewInfo(reviewDTO.getReviewInfo())
                    .reviewId(reviewId)
                    .avgScore(reviewDTO.getAvgScore())
                    .expense(reviewDTO.getExpense())
                    .build();
            reviewArrayList.add(review);
        }
        System.out.println(reviewArrayList);
        reviewRepository.saveAll(reviewArrayList);
        courseDTO.setPostedDate(String.valueOf(createdCourse.getPostedDate()));
        courseDTO.setCourseId(courseId);
        return courseDTO;
    }
}
