package gachon.bigdate.thenthen.DTO;

import gachon.bigdate.thenthen.entity.Comment;
import gachon.bigdate.thenthen.entity.Course;
import gachon.bigdate.thenthen.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
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
    public CourseDTO(){
        this.scrapCount=0;
        this.likeCount=0;
    }

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

    public CourseDTO(Course course, List<Review> reviewList, List<Comment> commentList, String userId, int likeCount, int scrapCount) {
        this(course, userId, likeCount, scrapCount, commentList.size());
        List<CommentDTO> commentDTOList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentDTOList.add(new CommentDTO(comment));
        }
        this.commentList = (ArrayList<CommentDTO>) commentDTOList;

        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        for (Review review : reviewList) {
            reviewDTOList.add(new ReviewDTO(review));
        }
        this.reviewList = (ArrayList<ReviewDTO>) reviewDTOList;
    }

    public CourseDTO(int scrapCount, int likeCount){
        this.scrapCount=scrapCount;
        this.likeCount=likeCount;
    }
}
