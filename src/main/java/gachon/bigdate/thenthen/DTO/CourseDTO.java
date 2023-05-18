package gachon.bigdate.thenthen.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Review;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CourseDTO {
    private Long courseId;
    private Long id;
    private String userId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime postedDate;
    private String courseTitle;
    private String courseInfo;
    private int scrapCount;
    private int likeCount;
    private ArrayList<ReviewDTO> reviewList;
    private ArrayList<CommentDTO> commentList;
    private int commentCount;
    private boolean scraped;
    private boolean liked;

    public CourseDTO(Course course, String userId, int likeCount, int scrapCount,  int commentCount) {
        this.id = course.getId();
        this.courseId = course.getCourseId();
        this.courseInfo = course.getCourseInfo();
        this.courseTitle = course.getCourseName();
        this.postedDate = course.getPostedDate();
        this.scrapCount = scrapCount;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.userId = userId;
    }

    public CourseDTO(Course course, List<Review> reviewList, List<Comment> commentList, String userId
            , int likeCount, int scrapCount) {
        this(course, userId, likeCount, scrapCount, commentList.size());
        ArrayList<CommentDTO> commentDTOList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentDTOList.add(new CommentDTO(comment,comment.getUser()));
        }
        this.commentList = commentDTOList;

        ArrayList<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (Review review : reviewList) {
            reviewDTOList.add(new ReviewDTO(review));
        }

        this.reviewList = reviewDTOList;
        this.liked=false;
        this.scraped=false;
    }

    public CourseDTO(Course course){
        this(course, course.getUser().getUserId(), course.getLikeCount(), course.getScrapCount(), course.getCommentCount());
        ArrayList<CommentDTO> commentDTOList = new ArrayList<>();
        for (Comment comment : course.getCommentList()) {
            commentDTOList.add(new CommentDTO(comment,comment.getUser()));
        }
        this.commentList = commentDTOList;
        ArrayList<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (Review review : course.getReviewList()) {
            reviewDTOList.add(new ReviewDTO(review));
        }
        this.reviewList = reviewDTOList;

    }


}
