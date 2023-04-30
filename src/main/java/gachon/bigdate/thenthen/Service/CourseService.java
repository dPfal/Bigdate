package gachon.bigdate.thenthen.Service;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.Repository.*;
import gachon.bigdate.thenthen.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final ReviewRepository reviewRepository;
    private final LikeRepository likeRepository;
    private final ScrapRepository scrapRepository;
    private final CommentRepository commentRepository;
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
            Review review = Review.builder()
                    .isDel(0)
                    .reviewInfo(reviewDTO.getReviewInfo())
                    .reviewId(ReviewId.builder().courseId(createdCourse.getCourseId()).placeId(reviewDTO.getPlaceId()).placeSequence(reviewDTO.getPlaceSequence()).build())
                    .avgScore(reviewDTO.getAvgScore())
                    .expense(reviewDTO.getExpense())
                    .build();
            reviewArrayList.add(review);
        }
        reviewRepository.saveAll(reviewArrayList);
        courseDTO.setPostedDate(createdCourse.getPostedDate());
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
        System.out.println(course);

        return new CourseDTO(course,course.getReviewList(),
                course.getCommentList(), course.getUser().getUserId(),
                course.getLikeCount(),course.getScrapCount());
    }

    public String toggleLike(long courseId, long id){
        String message;
        Like like = Like.builder().likeId(LikeId.builder().courseId(courseId).id(id).build()).build();
        Optional<Like> existingScrap = this.likeRepository.findById(like.getLikeId());
        if(existingScrap.isPresent()){
            this.likeRepository.delete(existingScrap.get());
            message = "좋아요 목록에서 삭제되었습니다.";
        }else{
            this.likeRepository.save(like);
            message = "좋아요 목록에 추가되었습니다.";
        }
        return message;
    }

    public String toggleScrap(long courseId, long id) {
        String message;
        Scrap scrap = Scrap.builder().scrapId(ScrapId.builder().courseId(courseId).id(id).build()).build();
        Optional<Scrap> existingScrap = this.scrapRepository.findById(scrap.getScrapId());
        if (existingScrap.isPresent()) {
            this.scrapRepository.delete(existingScrap.get());
            message = "찜 목록에서 삭제되었습니다.";
        } else {
            this.scrapRepository.save(scrap);
            message = "찜 목록에 추가되었습니다.";
        }

        return message;
    }

    public ArrayList<CourseDTO> getScrapList(long id) {
       Optional<List<Scrap>> scrapList = this.scrapRepository.findByScrapIdId(id);
       ArrayList<CourseDTO> courseDTOS = new ArrayList<>();

       if(scrapList.isEmpty()){
           return null;
       }else{
            for(Scrap scrap: scrapList.get()){
                CourseDTO courseDTO =
                        new CourseDTO(scrap.getCourse(),scrap.getCourse().getUser().getUserId(),scrap.getCourse().getLikeCount(),
                                scrap.getCourse().getScrapCount(),scrap.getCourse().getCommentCount());
                courseDTOS.add(courseDTO);
            }
            return courseDTOS;
       }
    }

    public CommentDTO createComment(CommentDTO commentDTO) {
        Course course = courseRepository.findByCourseId(commentDTO.getCourseId());
        Comment comment = Comment.builder().commentId(CommentId.builder().courseId(commentDTO.getCourseId())
                .id(commentDTO.getId()).commentDate(LocalDateTime.now()).build()).commentText(commentDTO.getCommentText()).course(course).build();
       this.commentRepository.save(comment);
       return new CommentDTO(comment);
    }
    @Transactional
    public String deleteCourse(Long courseId){
        String message = "삭제 실패";
        this.scrapRepository.deleteAllByScrapIdCourseId(courseId);
        this.likeRepository.deleteAllByLikeIdCourseId(courseId);
        if(this.courseRepository.deleteByCourseId(courseId)==1){
            message = "course Id : "+ courseId + " 삭제 완료!";
        }
        return message;
    }

    public ArrayList<CourseDTO> getUserCourses(long id) {
        ArrayList<CourseDTO> courseDTOArrayList = new ArrayList<>();
       Optional<List<Course>> courseList = Optional.ofNullable(courseRepository.findAllById(id));

       if(courseList.isPresent()){
           System.out.println(courseList);
           for(Course course : courseList.get()){
               courseDTOArrayList.add(new CourseDTO(course, course.getUser().getUserId(), course.getLikeCount(), course.getScrapCount(), course.getCommentCount()));
           }
           return courseDTOArrayList;
       }else{
           return null;
       }

    }
}
