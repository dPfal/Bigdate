package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.Repository.*;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Review;
import gachon.bigdate.thenthen.entity.ReviewId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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
        reviewRepository.saveAll(reviewArrayList);
        courseDTO.setPostedDate(String.valueOf(createdCourse.getPostedDate()));
        courseDTO.setCourseId(courseId);
        return courseDTO;
    }


    public Page<CourseDTO> getCourseList(Pageable pageable) {
        Page<Course> courseList = this.courseRepository.findAll(pageable);
        List<CourseDTO> courseDTOList = new ArrayList<>();
        for(Course course : courseList.getContent()){
            courseDTOList.add(new CourseDTO(course,course.getUser().getUserId(),
                    course.getLikeCount(),course.getScrapCount(),
                    course.getCommentCount()));
        }
        return new PageImpl<>(courseDTOList, pageable, courseList.getTotalElements());
    }

    public CourseDTO getCourseByCourseId(long courseId){
        Course course = this.courseRepository.findByCourseId(courseId);
        return new CourseDTO(course,course.getReviewList(),
                course.getCommentList(), course.getUser().getUserId(),
                course.getLikeCount(),course.getScrapCount());
    }
}
