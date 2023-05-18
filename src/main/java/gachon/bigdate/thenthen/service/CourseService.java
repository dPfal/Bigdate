package gachon.bigdate.thenthen.service;

import gachon.bigdate.thenthen.DTO.CommentDTO;
import gachon.bigdate.thenthen.DTO.CourseDTO;
import gachon.bigdate.thenthen.DTO.ReviewDTO;
import gachon.bigdate.thenthen.repository.*;
import gachon.bigdate.thenthen.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    @Transactional
    public CourseDTO createCourse(CourseDTO courseDTO){
        Course createdCourse = this.courseRepository.save(Course.builder().postedDate(LocalDateTime.now())
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
                    .reviewId(ReviewId.builder().course(createdCourse).place(this.placeRepository.findByPlaceId(reviewDTO.getPlaceId())).placeSequence(reviewDTO.getPlaceSequence()).build())
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

    @Transactional
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


    public CourseDTO getCourseByCourseId(long... courseIdAndId){
        Course course = this.courseRepository.findByCourseId(courseIdAndId[0]);
        CourseDTO courseDTO = new CourseDTO(course,course.getReviewList(),
                course.getCommentList(), course.getUser().getUserId(),
                course.getLikeCount(),course.getScrapCount());
        if(courseIdAndId.length==2) { //회원일 경우
            courseDTO.setLiked(this.likeRepository.countByLikeIdCourseIdAndLikeIdId(courseIdAndId[0], courseIdAndId[1]) != 0);
            courseDTO.setScraped(this.scrapRepository.countByScrapIdCourseIdAndScrapIdId(courseIdAndId[0], courseIdAndId[1]) != 0);
        }
        return courseDTO;
    }
    @Transactional
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
    @Transactional
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
    @Transactional
    public CommentDTO createComment(CommentDTO commentDTO) {
        Course course = courseRepository.findByCourseId(commentDTO.getCourseId());
        Optional<User> user = userRepository.findById(commentDTO.getId());
        Comment comment = Comment.builder().commentId(CommentId.builder().courseId(commentDTO.getCourseId())
                .id(commentDTO.getId()).commentDate(LocalDateTime.now()).build()).commentText(commentDTO.getCommentText()).course(course).user(user.get()).build();
        System.out.println(comment);
        System.out.println(commentDTO);
        this.commentRepository.save(comment);
       return new CommentDTO(comment,user.get());
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

    public CourseDTO updateCourse(CourseDTO courseDTO){
        System.out.println(courseDTO.getCourseId());
        System.out.println(this.reviewRepository.findByReviewIdCourseCourseId(courseDTO.getCourseId()));
        System.out.println("delete : "+this.reviewRepository.deleteAllByReviewIdCourseCourseId(courseDTO.getCourseId()));

        Course course = this.courseRepository.findByCourseId(courseDTO.getCourseId());
        course.setCourseInfo(courseDTO.getCourseInfo());
        course.setCourseName(courseDTO.getCourseTitle());
        this.courseRepository.save(course);
        List<Review> reviewList = new ArrayList<>();
        for(ReviewDTO reviewDTO : courseDTO.getReviewList()){
            reviewList.add(Review.builder().reviewId(ReviewId.builder().placeSequence(reviewDTO.getPlaceSequence())
                            .place(this.placeRepository.findByPlaceId(reviewDTO.getPlaceId())).course(course).build()).expense(reviewDTO.getExpense())
                    .avgScore(reviewDTO.getAvgScore()).reviewInfo(reviewDTO.getReviewInfo()).isDel(0).build());
        }
        this.reviewRepository.saveAll(reviewList);
        return courseDTO;
    }

    public ResponseEntity<?> blindReviewToggle(CourseDTO courseDTO){
      ReviewId reviewId = ReviewId.builder().course(this.courseRepository.findByCourseId(courseDTO.getCourseId())).place(placeRepository.findByPlaceId(courseDTO.getReviewList().get(0).getPlaceId()))
              .placeSequence(courseDTO.getReviewList().get(0).getPlaceSequence()).build();
      Review review = reviewRepository.findByReviewId(reviewId);
      if(review.getIsDel()==0){
          review.setIsDel(1);
      }
      else{
          review.setIsDel(0);
      }
      reviewRepository.save(review);
      return ResponseEntity.ok().body(new ReviewDTO(review));
    }

    public ResponseEntity<?> deleteComment(CommentDTO commentDTO){
       Comment comment = commentRepository.findByCommentId(CommentId.builder().commentDate(commentDTO.getCommentDate())
               .courseId(commentDTO.getCourseId()).id(commentDTO.getId()).build());
       if(comment != null ){
           commentRepository.delete(comment);
           return ResponseEntity.ok().body("댓글 삭제 완료");
       }else{
           return ResponseEntity.badRequest().body("오류가 발생했습니다. 잠시후 다시 시도해주세요. ");
       }


    }
}
