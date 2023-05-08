package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Review;
import lombok.*;

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


}
